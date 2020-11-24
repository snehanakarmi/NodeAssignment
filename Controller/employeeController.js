const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const fetch = require('node-fetch');

exports.third_party_api_data = async function(request, response){
    try{
        let api_url = "http://dummy.restapiexample.com/api/v1/employees";
        let api_data_response = await fetch(api_url);
        let jsonData = await api_data_response.json();
        return response.status(200).json(jsonData);
    }catch(e){
        return response.status(429).json({'error':'too many requests'})
    }
}

exports.get = async function(request, response){
    const employee = await Employee.find({});
    return response.status(200).json(employee);

}

exports.create =  async function(request, response){
    let {id, employee_name, employee_salary, employee_age, profile_image} = request.body
    let EMPLOYEE = new Employee();
    EMPLOYEE.id = id;
    EMPLOYEE.employee_name = employee_name;
    EMPLOYEE.employee_age = employee_age;
    EMPLOYEE.employee_salary = employee_salary;
    EMPLOYEE.profile_image = profile_image;
    await EMPLOYEE.save();
    return response.status(201).json(EMPLOYEE);
}

exports.update = async function(request, response){
    let {id, employee_name, employee_salary, employee_age, profile_image} = request.body
    let EMPLOYEE = await Employee.findById(request.params.id);
    if(!EMPLOYEE){
        return response.status(204).json({'error': 'Employee Data not found'});
    }else{
    EMPLOYEE.id = id;
    EMPLOYEE.employee_name = employee_name;
    EMPLOYEE.employee_age = employee_age;
    EMPLOYEE.employee_salary = employee_salary;
    EMPLOYEE.profile_image = profile_image;
    EMPLOYEE.save();
    return response.status(200).json(EMPLOYEE);
    }
}

exports.destroy = async function(request, response){
    let EMPLOYEE = await Employee.findById(request.params.id);
    if(!EMPLOYEE){
        return response.status(204).json({'error': 'Employee Data not found'});
    }else{
        await EMPLOYEE.remove();
        return response.status(204).json(EMPLOYEE);
    }
}

exports.getById = async function(request, response){
    let EMPLOYEE = await Employee.findById(request.params.id);
    return response.status(200).json(EMPLOYEE);
}