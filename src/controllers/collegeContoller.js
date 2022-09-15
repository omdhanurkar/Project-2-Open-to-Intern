const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");


//=====================================================create Colleges=======================================================

const createCollege = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter data" });
        }

        if (!data.name) {
            return res.status(400).send({ status: false, message: "Please enter a name" });
        }

        if (!/^[a-zA-Z]+$/i.test(data.name)) {
            return res.status(400).send({ status: false, message: "Name should be Alphabetic" });
        }

        if (!data.fullName) {
            return res.status(400).send({ status: false, message: "Please enter Full name" });
        }

        if (!/^[a-zA-Z ,]+$/i.test(data.fullName)) {
            return res.status(400).send({ status: false, message: "Full name should be Alphabetic" });
        }

        if (!data.logoLink) {
            return res.status(400).send({ status: false, message: "Please enter logo link" });
        }

        if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(data.logoLink)) {
            return res.status(400).send({ status: false, message: "Please enter valid url" });
        }

        const checkusedName = await collegeModel.findOne({ name: data.name, fullName: data.fullName });
        if (checkusedName) {
            return res.status(400).send({ status: false, message: "This college already exists" });
        }

        let collegeData = await collegeModel.create(data);
        let newData = { name: collegeData.name, fullName: collegeData.fullName, logoLink: collegeData.logoLink, isDeleted: collegeData.isDeleted }

        return res.status(201).send({ data: newData });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

//=================================================GET colleges====================================================================

const getCollege = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;
        if (collegeName.length == 0) {
            return res.status(400).send({ status: false, msg: "collegeName must be entered" });
        }
        let college = await collegeModel.findOne({ name: collegeName });             //college details
        if (!college) return res.status(404).send({ status: false, msg: "Could not find College details" });

        let internsData = await internModel.find({ collegeId: college._id }).select({ name: 1, email: 1, mobile: 1, _id: 1 }); // student(intern) details
        if (internsData.length === 0) {
            return res.status(404).send({ status: false, msg: "Could not find Interns details for this college" });
        }

        let allInterns = {                                          // both college and student details
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: internsData
        };
        return res.status(200).send({ data: allInterns });
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports = { createCollege, getCollege };