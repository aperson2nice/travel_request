import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormArray, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

// FormGroup, FormBuilder, FormArray, 

@Component({
  selector: 'app-tr-form',
  templateUrl: './tr-form.component.html',
  styleUrls: ['./tr-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})

export class TrFormComponent {

  now = new Date();
  datetime = this.now.toLocaleString();
  date = this.datetime.split(' ')[0];

  secretary_num = new FormControl()
  secretary_name = new FormControl()
  secretary_email = new FormControl()

  primary_traveler_emp_num = new FormControl()
  primary_traveler_vend_num = new FormControl()
  primary_traveler_name = new FormControl()

  departure_date = new FormControl()
  departure_time = new FormControl()
  return_date = new FormControl()
  return_time = new FormControl()
  destination_city = new FormControl()
  destination_state = new FormControl()

  travel_purpose = new FormControl()
  travel_justification = new FormControl()

  number_of_add_employees = new FormControl()
  number_of_add_board = new FormControl()
  number_of_student = new FormControl()
  number_of_non_board = new FormControl()

  district_funds_required = new FormControl()

  district_funds_submitted: any[] = [];

  district_funds_array: any[] = [];
  dist_fund_response!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createDistrictFundForm(); // init form data
    this.initialDistrictFundsData(); // setting up the question array data into form.
  }

  ngOnInit(){
    this.emplCountAddNum() 
    this.studCountAddNum()
  }

  createDistrictFundForm() {
    this.dist_fund_response = this.formBuilder.group({
      DistFundRows: this.formBuilder.array([this.initDistFundRows()]),
    });
  }

  //getter function ease up to get the form controls
  get formArr() {
    return this.dist_fund_response.get('DistFundRows') as FormArray;
  }

  initDistFundRows() {
    return this.formBuilder.group({
      fund: [''],
      type: [''],
      function: [''],
      object: [''],
      sub_object: [''],
      location: [''],
      year: [''],
      pic: [''],
      department: [''],
      grant: [''],
      funds: [''],
      dist_fund_response:['']
    });
  }

  initialDistrictFundsData() {
    this.district_funds_array.forEach((row) => {
      this.formArr.push(this.addRow(row));
    });
  }

  addRow(obj) {
    return this.formBuilder.group({
      fund: [obj.fund],
      type: [obj.type],
      function: [obj.function],
      object: [obj.object],
      sub_object: [obj.sub_object],
      location: [obj.location],
      year: [obj.year],
      pic: [obj.pic],
      department: [obj.department],
      grant: [obj.grant],
      funds: [obj.funds],
      dist_fund_response: [obj.dist_fund_response]
    });
  }

  addNewRow() {
    let obj1 = {
      fund: '',
      type: '',
      function: '',
      object: '',
      sub_object: '',
      location: '',
      year: '',
      pic: '',
      department: '',
      grant: '',
      funds: ''
    };
    this.formArr.push(this.addRow(obj1));
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  getAllData(){
    let dataObject = {
      now: this.now,
      datetime: this.datetime,
      date: this.date,

      secretary_num: this.secretary_num.value,
      secretary_name: this.secretary_name.value, 
      secretary_email: this.secretary_email.value,

      traveler_emp_num: this.primary_traveler_emp_num.value,
      primary_traveler_vend_num: this.primary_traveler_vend_num.value,
      primary_traveler_name: this.primary_traveler_name.value,

      departure_date: this.departure_date.value,
      departure_time : this.departure_time.value,
      return_date : this.return_date.value,
      return_time : this.return_time.value,
      destination_city : this.destination_city.value,
      destination_state : this.destination_state.value,

      travel_purpose : this.travel_purpose.value,
      travel_justification : this.travel_justification.value,

      number_of_add_employees : this.number_of_add_employees.value,
      number_of_add_board : this.number_of_add_board.value,
      number_of_student : this.number_of_student.value,
      number_of_non_board : this.number_of_non_board.value,

      district_funds_required : this.district_funds_required.value,
      dist_fund_response: this.dist_fund_response.value
    }
    return dataObject
  }



  onSubmit() {
    console.log(this.getAllData())
  }


  // ------------ Old Code -------------------

  // this makes the drop down 1-20 for employees and board members, and 1-300 for student additional travelers
  studCount= [];
  studCountNum = 0;
  numOfStudents = 0;

  emplCount = []; 
  emplCountNum = 0;
  numOfEmployees = 0;


  numOfBoardMembers = 0;
  boardMembersTable = [];

  


  numOfNonBoardMembers = 0;
  nonBoardMembersTable = [];



  studCountAddNum() {
    while (this.studCount.length < 301) {

      this.studCount.push(this.studCountNum)
      this.studCountNum++;
 
    }
  }

  emplCountAddNum() {
    while (this.emplCount.length < 21) {

      this.emplCount.push(this.emplCountNum)
      this.emplCountNum++;
      
    }
  }

  numEmployees(value) {
    this.numOfEmployees = value;
   
  }



  numBoardMembers(value) {
    this.numOfBoardMembers = value;

  }

  numStudents(value) {
    this.numOfStudents = value;
   
  }

  numNonBoardMembers(value) {
    this.numOfNonBoardMembers = value;
   
  }


}
