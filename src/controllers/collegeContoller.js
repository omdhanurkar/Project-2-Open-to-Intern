const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

// const isValid = function (value) {
//     if (typeof value == "string" && value.trim().length === 0) return false;
//     if (typeof value === "undefined" || value === null) return false;
//     return true;
// };

const createCollege = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0) {
            // !data
            return res
                .status(400)
                .send({ status: false, message: "Please enter data" });
        }

        if (!data.name) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter a name" });
        }

        if (!/^[a-zA-Z]+$/i.test(data.name)) {
            return res
                .status(400)
                .send({ status: false, message: "Name should be Alphabetic" });
        }

        if (!data.fullName) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter Full name" });
        }

        if (!/^[a-zA-Z ,]+$/i.test(data.fullName)) {
            return res
                .status(400)
                .send({ status: false, message: "Full name should be Alphabetic" });
        }

        if (!data.logoLink) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter logo link" });
        }

        if (
            !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
                data.logoLink
            )
        ) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter valid url" });
        }

        const checkusedName = await collegeModel.findOne({ name: data.name }).count();
        console.log(checkusedName);
        if (checkusedName) {
            return res.status(400).send({ status: false, message: "Name already exists" });
        }

        let collegeData = await collegeModel.create(data);
        return res
            .status(201)
            .send({
                status: true,
                message: "College data is successfully created",
                data: collegeData,
            });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

const getCollege = async function (req, res) {
    try {
        let data = req.query.collegeName;
        if (data.length == 0) {
            return res.status(400).send({ status: false, msg: "collegeName must be entered" });
        }
        let college = await collegeModel.findOne({ name: data }).select({ name: 1, fullName: 1, logoLink: 1 });  //college details

        let collegeData = await internModel.find({ collegeId: college._id }).select({ name: 1, email: 1, mobile: 1, _id: 1 }); // student(intern) details
        // return res.status(200).send({status:true, college:college,interns:collegeData})
        let allInterns = {   // both college and student details
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: collegeData
        };
        return res.status(200).send({ status: true, data: allInterns });
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports = { createCollege, getCollege };