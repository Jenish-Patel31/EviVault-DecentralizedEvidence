const { ObjectId } = require('bson');
// const mongoose = require('mongoose');

// const caseSchema = new mongoose.Schema({
//     caseId: { type:ObjectId, required: true ,unique:true },
//     caseName: { type: String, required: true },
//     caseDate: { type: Date, required: true },
//     caseType : { type: String, required: true },
//     place: { type: String, required: true },
//     investigatorOfficer: { type: String, required: true },
//     departmentName: { type: String, required: true },
//     caseStatus: { type: String, required: true },
//     forwardTo: { type: String, required: true},
//     caseDescription: { type: String, required: true }
// })

// const Case =  mongoose.model('Case', caseSchema);

// module.exports = Case ;

const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    caseName: { type: String, required: true },
    caseDescription: { type: String, required: true },
    caseId: { type: String, required: true },
    caseDate: { type: Date, required: true },
    caseType: { type: String, required: true },
    place: { type: String, required: true },
    investigatorOfficer: { type: String, required: true },
    departmentName: { type: String, required: true },
    caseStatus: { type: String, required: true },
    forwardTo: { type: String, required: true },
    documents: [
        {
            name: { type: String, required: true },
            cid: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('Case', caseSchema);