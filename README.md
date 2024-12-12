# Project Name: EviVault

## **Project Statement**
A secure and immutable evidence management system integrating **Blockchain** and **IPFS** for efficient storage, tracking, and retrieval of digital evidence.


<!-- ### **Demo Video** -->


## **Overview**
EviVault aims to revolutionize evidence management by leveraging blockchain's immutability and IPFS's decentralized storage. This platform ensures evidence is securely stored, tamper-proof, and easily accessible for judicial and investigative processes.


## **Core Features**
1. **Blockchain Integration**:
   - Evidence details stored immutably on the blockchain.
   - Tamper-proof logs for all evidence-related activities.
   - Transparent and secure access to evidence information.
   
2. **Decentralized File Storage**:
   - Files are uploaded to IPFS for decentralized and efficient retrieval.
   - CIDs are linked to case records stored on the blockchain.
   
3. **Dynamic Roles and Permissions**:
   - Role-based access for **Judicial Officers**, **Investigators**, and **Admins**.
   - Custom workflows based on user roles.

4. **Case Management**:
   - Create and manage cases with detailed information.
   - Attach evidence with real-time blockchain updates.

5. **Audit Trails**:
   - Immutable logs of login activities for transparency and accountability.


## **Technology Stack**

#### **Backend**
- **Node.js**: API and server logic.
- **Express.js**: Backend framework.
- **Blockchain**: Smart contracts on **Ethereum Sepolia** testnet.
- **IPFS**: Decentralized file storage.
- **MongoDB**: For auxiliary data storage (optional-but for now i used this cid' are stored here for temporary).

#### **Frontend**
- **HTML5**: Structure.
- **CSS3**: Styling.
- **JavaScript**: Interactivity.

#### **Blockchain**
- **Solidity**: Smart contract programming.
- **Ethers.js**: Interaction with Ethereum blockchain.


## **How It Works**

#### **1. Case Creation**
- Users can create new cases by entering details such as case type, location, and investigator information.
- Evidence files are uploaded to IPFS, generating unique CIDs.
- CIDs and case details are logged on the blockchain for immutability.

#### **2. Evidence Retrieval**
- Evidence linked to a case can be retrieved from IPFS using the CID.
- Judicial officers can view evidence along with timestamps and logs.

#### **3. Audit Trail**
- Every user action is logged immutably on the blockchain.
- Login timestamps and roles are recorded for accountability.


## **Key Modules**
1. **Login Module**:
   - Role-based authentication (Admin, Investigator, Judicial Officer).
   - Blockchain-based login audit trail.

2. **Evidence Library**:
   - Dynamic retrieval of evidence files from IPFS.
   - Display metadata such as file name, CID, and upload date.

3. **Case Management**:
   - Input case details and attach evidence files.
   - Track case status and assigned officers.


<!-- ### **Flow Diagram** -->


### **Installation Instructions**

#### **1. Prerequisites**
   - Install **Node.js** (>= 16.x).
   - Install **MetaMask** browser extension.

#### **2. Clone the Repository**

```
git clone https://github.com/yourusername/EviVault.git
cd EviVault
```

#### **3. Install Dependencies**
```
npm install

```
#### **4. Setup Environment Varibles**
```
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_api_key
PRIVATE_KEY=your_wallet_private_key
INFURA_PROJECT_ID=your_infura_project_id
```

#### **5. Run the Application**
```
node index.js
```

#### **6. Access through localhost**
```
http://localhost:3000
```


## Screenshots

### 1. EviVault Login Page
![loginPage](https://github.com/user-attachments/assets/92b6abe0-1928-4002-8fa4-f17d04d7440e)



### 2. EviVault Dashboard
![Dashboard](https://github.com/user-attachments/assets/2527cead-81f1-4fb3-92c4-4bbda16707eb)


### 3. EviVault Case Creation Page
![Casecreation](https://github.com/user-attachments/assets/37133027-ae21-4c63-908b-8dbd7ce51901)


### 4. EviVault Evidence Library
![evidence-library](https://github.com/user-attachments/assets/6345b00c-0d6b-4e86-a339-befb0cee1773)



### 5. EviVault Login Trail for Each User
![LogDetails](https://github.com/user-attachments/assets/ba27e097-57c7-4181-aab8-2fa9a8294a9b)


## Contact
For queries or suggestions:

- **Email**: jenishkp07@gmail.com
- **GitHub**: Jenish-Patel31(https://github.com/Jenish-Patel31)
- **LinkedIn**: jenish-patel-31k (https://www.linkedin.com/in/jenish-patel-31k/)
