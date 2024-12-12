const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { ethers } = require('ethers');
const axios = require('axios');
const FormData = require('form-data');
const { library } = require('webpack')
const fs = require('fs');
require('dotenv').config();


const Case = require('../models/case');
const User = require('../models/users');


// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Pinata API credentials from environment variables
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;



// Blockchain configuration
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = process.env.CONTRACT_ABI;

// Initialize provider and contract
// const provider = ethers.getDefaultProvider() // Use appropriate testnet or mainnet
const provider = new ethers.InfuraProvider('sepolia', '0118b15ca7ac462cb5275348eb01ee4a');
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);



const register = async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,  // You should hash this in a real app
            mobile: req.body.mobile,
            adharCard: req.body.adharCard,
            birthdate: req.body.birthdate,
            address: req.body.address,
            userRole: req.body.userRole  // Add user role from form
        });

        await newUser.save();

        res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};


const login = async (req, res) => {

    try {
        // const { username, password } = req.body;
        const { username, password, departmentId } = req.body;


        let user;

        if (departmentId) {
            user = await User.findOne({ username, departmentId });
            if (!user) {
                return res.status(404).json({ message: 'Department user not found' });
            }
        } else {
            // Otherwise, find a general user
            user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        }

        // Check if the password matches
        if (user.password !== password) { // Consider using hashing in production
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Log login event on blockchain
        try {
            const tx = await contract.logLogin(user.userRole, user._id.toString());
            await tx.wait(); // Wait for transaction to be mined
            console.log(`Login recorded on blockchain with transaction hash: ${tx.hash}`);
        } catch (error) {
            console.error('Blockchain transaction failed:', error);
        }



        // Respond with success message and user details
        res.json({
            message: 'Login successful',
            user: {
                username: user.username,
                email: user.email,
                // Include departmentId if it's a department user
                departmentId: user.departmentId || null,
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};


const getContractDetails = (req, res) => {
    res.json({
        contractAddress: CONTRACT_ADDRESS,
        contractABI: CONTRACT_ABI
    })
}




const uploadToIPFS = async (req, res) => {
    const files = req.files;

    if (!files || files.length === 0) {
        console.error("No files uploaded");
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedFiles = [];

    try {
        for (const file of files) {
            const fileStream = fs.createReadStream(file.path);
            const formData = new FormData();
            formData.append('file', fileStream, file.originalname); // Add file name explicitly

            const metadata = JSON.stringify({ name: file.originalname });
            formData.append('pinataMetadata', metadata);

            // Use formData.getHeaders() to get the appropriate headers
            const headers = {
                ...formData.getHeaders(), // Get headers from FormData
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey,
            };

            console.log("Uploading file to IPFS:", file.originalname);

            const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                maxContentLength: 'Infinity',
                headers: headers,
            });

            console.log("File uploaded to IPFS with CID:", response.data.IpfsHash);

            uploadedFiles.push({
                name: file.originalname,
                cid: response.data.IpfsHash,
            });

            // Remove file from local storage
            fs.unlinkSync(file.path);
        }

        res.json(uploadedFiles); // Send back array of uploaded files with CIDs
    } catch (error) {
        console.error("Error in uploadToIPFS:", error.message); // Log the error for troubleshooting
        res.status(500).json({ error: 'Failed to upload files to Pinata', details: error.message });
    }
};


//createcase for solve error...
const createCase = async (req, res) => {
    console.log("Received data for case creation:", req.body); // Log the incoming request data

    const { caseName, caseDescription, caseId, caseDate, caseType, place, investigatorOfficer, departmentName, caseStatus, forwardTo, documents } = req.body;

    try {
        const newCase = new Case({
            caseName,
            caseDescription,
            caseId,
            caseDate,
            caseType,
            place,
            investigatorOfficer,
            departmentName,
            caseStatus,
            forwardTo,
            documents
        });

        await newCase.save();
        res.json({ message: 'Case saved successfully', case: newCase });
    } catch (error) {
        console.error("Error in createCase:", error.message); // Log the exact validation error
        res.status(500).json({ error: 'Error saving case', details: error.message });
    }
};







//till working

// const createCase = async (req, res) => {
//     const { caseName, caseDescription, documents } = req.body;
//     try {
//         const newCase = new Case({
//             caseName,
//             caseDescription,
//             documents, // Array with name and CID
//         });
//         await newCase.save();
//         res.json({ message: 'Case saved successfully', case: newCase });
//     } catch (error) {
//         console.error("Error in createCase:", error.message);
//         res.status(500).json({ error: 'Error saving case' });
//     }
// };



const getCases = async (req, res) => {
    try {
        const cases = await Case.find();
        res.json(cases);
    } catch (error) {
        console.error("Error fetching cases:", error);
        res.status(500).json({ error: 'Error fetching cases' });
    }
};





module.exports = {
    register,
    login,
    getContractDetails,
    uploadToIPFS,
    createCase,
    getCases,
};
