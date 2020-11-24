const mongoose = require('nongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
	id: {type: String},
	employee_name: {type: String},
	
});