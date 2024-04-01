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

  //------------ All Table-like forms variables and functions.

  additional_employees_submitted: any[] = [];
  additional_employees_array: any[] = [];
  additional_empoloyee_response!: FormGroup;
  ADD_EMP_TABLE_NAME = "additional employee"

  additional_boardmember_submitted: any[] = [];
  additional_boardmember_array: any[] = [];
  additional_boardmember_response!: FormGroup;
  ADD_BOARD_TABLE_NAME = "additional boardmember"

  district_funds_required = new FormControl() // Yes/No radio buttons
  district_funds_submitted: any[] = [];
  district_funds_array: any[] = [];
  dist_fund_response!: FormGroup;
  DIST_FUND_TABLE_NAME = "district fund"  

  constructor(private formBuilder: FormBuilder) {
    this.create_dropdowns();
    this.createForms(); // init form data (all forms)
    this.initialData(); // set up form data (all forms)
  }

  // add other tables here
  createForms() {
    this.additional_empoloyee_response = this.formBuilder.group({
      AdditionalEmployeeRows: this.formBuilder.array([this.initRows(this.ADD_EMP_TABLE_NAME)])
    })

    this.additional_boardmember_response = this.formBuilder.group({
      AdditionalBoardmemberRows: this.formBuilder.array([this.initRows(this.ADD_BOARD_TABLE_NAME)])
    })

    this.dist_fund_response = this.formBuilder.group({
      DistFundRows: this.formBuilder.array([this.initRows(this.DIST_FUND_TABLE_NAME)]),
    });
  }

  // getter functions (one for each table) to get the form controls
  get formArr() {
    return this.dist_fund_response.get('DistFundRows') as FormArray;
  }

  get additionalEmpFormArr() {
    return this.additional_empoloyee_response.get('AdditionalEmployeeRows') as FormArray;
  }

  get additionalBoardmemberFormArr() {
    return this.additional_boardmember_response.get('AdditionalBoardmemberRows') as FormArray;
  }

  // initialization funciton, add if for other tables
  initRows(tablename) {
    if (tablename == this.DIST_FUND_TABLE_NAME) {
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
        dist_fund_response: ['']
      });
    } else if (tablename == this.ADD_EMP_TABLE_NAME) {
      return this.formBuilder.group({
        employee_number: [''],
        name: [''],
        vendor_number: [''],
        add_emp_response: ['']
      });
    } else if (tablename == this.ADD_BOARD_TABLE_NAME) {
      return this.formBuilder.group({
        board_name: [''],
        board_email: [''],
        add_board_response: ['']
      });
    }

    return null
  }

  // add other tables
  initialData() {
    this.additional_employees_array.forEach((row) => {
      this.additionalEmpFormArr.push(this.addRow(row, this.ADD_EMP_TABLE_NAME))
    })

    this.additional_boardmember_array.forEach((row) => {
      this.additionalBoardmemberFormArr.push(this.addRow(row, this.ADD_BOARD_TABLE_NAME))
    })

    this.district_funds_array.forEach((row) => {
      this.formArr.push(this.addRow(row, this.DIST_FUND_TABLE_NAME));
    });
    
  }

  // add if for other tables
  addRow(obj, tablename) {
    if (tablename == this.DIST_FUND_TABLE_NAME) {
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

    } else if (tablename == this.ADD_EMP_TABLE_NAME) {
      return this.formBuilder.group({
        employee_number: [obj.employee_number],
        name: [obj.name],
        vendor_number: [obj.function],
        add_emp_response: [obj.add_emp_response]
      });
    } else if (tablename == this.ADD_BOARD_TABLE_NAME) {
      return this.formBuilder.group({
        board_name: [obj.employee_number],
        board_email: [obj.name],
        add_emp_response: [obj.add_board_response]
      });
    }

    return null
  }

  // add if for other tables
  addNewRow(tablename) {
    console.log(this.number_of_add_employees.value)
    if (tablename == this.DIST_FUND_TABLE_NAME) {
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
      this.formArr.push(this.addRow(obj1, this.DIST_FUND_TABLE_NAME));

    } else if (tablename == this.ADD_EMP_TABLE_NAME) {
      if (this.additionalEmpFormArr.length < this.number_of_add_employees.value)
        while (this.additionalEmpFormArr.length < this.number_of_add_employees.value) {
          let obj1 = {
            employee_number: '',
            name: '',
            vendor_number: '',
            add_emp_response: ''
          };
          this.additionalEmpFormArr.push(this.addRow(obj1, this.ADD_EMP_TABLE_NAME));
        }
      else if (this.additionalEmpFormArr.length > this.number_of_add_employees.value) {
        while (this.additionalEmpFormArr.length > this.number_of_add_employees.value) {
          this.deleteRow(this.additionalEmpFormArr.length - 1, this.ADD_EMP_TABLE_NAME)
        }
      }
    } else if (tablename == this.ADD_BOARD_TABLE_NAME) {
      if (this.additionalBoardmemberFormArr.length < this.number_of_add_board.value)
        while (this.additionalBoardmemberFormArr.length < this.number_of_add_board.value) {
          let obj1 = {
            board_name: '',
            board_email: '',
            add_board_response: ''
          };
          this.additionalBoardmemberFormArr.push(this.addRow(obj1, this.ADD_BOARD_TABLE_NAME));
        }
      else if (this.additionalBoardmemberFormArr.length > this.number_of_add_board.value) {
        while (this.additionalBoardmemberFormArr.length > this.number_of_add_board.value) {
          this.deleteRow(this.additionalBoardmemberFormArr.length - 1, this.ADD_BOARD_TABLE_NAME)
        }
      }
    }
  }

  // add if for other tables
  deleteRow(index, tablename) {
    if (tablename == this.DIST_FUND_TABLE_NAME) {
      this.formArr.removeAt(index);

    } else if (tablename == this.ADD_EMP_TABLE_NAME) {
      this.additionalEmpFormArr.removeAt(index)

    } else if (tablename == this.ADD_BOARD_TABLE_NAME) {
      this.additionalBoardmemberFormArr.removeAt(index)
    }
  }
//--------- end of all table form content

  getAllData() {
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
      departure_time: this.departure_time.value,
      return_date: this.return_date.value,
      return_time: this.return_time.value,
      destination_city: this.destination_city.value,
      destination_state: this.destination_state.value,

      travel_purpose: this.travel_purpose.value,
      travel_justification: this.travel_justification.value,

      number_of_add_employees: this.number_of_add_employees.value,
      number_of_add_board: this.number_of_add_board.value,
      number_of_student: this.number_of_student.value,
      number_of_non_board: this.number_of_non_board.value,

      district_funds_required: this.district_funds_required.value,
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
  emplCount = []; 
  boardMembersTable = []; // not used?
  nonBoardMembersTable = []; // not used?

  create_dropdowns(){
    let counter = 0
      while (this.studCount.length < 301) {
        this.studCount.push(counter)
        counter++;
      }

      counter = 0
      while (this.emplCount.length < 21) {
        this.emplCount.push(counter)
        counter++;
      }
    }
  

  // ------------ Old Code -------------------

  // selectNum = [];
  // num = 0;
  // selectNum2 = [];
  // num2 = 0;

  // numOfEmployees = 0;
  // employeeTable = [];

  // numOfBoardMembers = 0;
  // boardMembersTable = [];

  // numOfStudents = 0;
  // studentTable = [];

  // numOfNonBoardMembers = 0;
  // nonBoardMembersTable = [];

  //  distFunds = 0;
  // distFundsRow = 1;
  // distFundsTable = []
  // distFundsLoc = 0;

  // // numAddEmployees:number;
  // // numAddEmplOptions=this.selectNum;
  // ngOnInit() {
  //   this.selOption();
  //   this.selOption2();
  // }
  // selOption() {
  //   while (this.selectNum.length < 301) {

  //     this.selectNum.push(this.num)
  //     this.num++;
  //     // console.log(this.num)
  //   }
  // }

  // selOption2() {
  //   while (this.selectNum2.length < 21) {

  //     this.selectNum2.push(this.num2)
  //     this.num2++;
  //     // console.log(this.num)
  //   }
  // }

  // numEmployees(value) {
  //   this.numOfEmployees = value;
  //   this.makeTableEmpl(this.numOfEmployees)
  // }

  // makeTableEmpl(value) {
  //   let tableId = 1;
  //   this.employeeTable = [];

  //   for (let i = 0; i < value; i++) {
  //     this.employeeTable.push(tableId);
  //     tableId++
  //   }
  // }

  // numBoardMembers(value) {
  //   this.numOfBoardMembers = value;
  //   this.makeTableBoard(this.numOfBoardMembers)
  //   // alert(this.numOfBoardMembers)
  // }



  // makeTableBoard(value) {
  //   let tableId = 1;
  //   this.boardMembersTable = [];

  //   for (let i = 0; i < value; i++) {
  //     this.boardMembersTable.push(tableId);
  //     tableId++
  //   }
  // }

  // numStudents(value) {
  //   this.numOfStudents = value;
  //   this.makeTableStudent(this.numOfStudents)
  //   // alert(this.numOfStudents)
  // }



  // makeTableStudent(value) {
  //   let tableId = 1;
  //   this.studentTable = [];

  //   for (let i = 0; i < value; i++) {
  //     this.studentTable.push(tableId);
  //     tableId++
  //   }
  // }

  // numNonBoardMembers(value) {
  //   this.numOfNonBoardMembers = value;
  //   this.makeTableNonBoard(this.numOfNonBoardMembers)
  //   // alert(this.numOfNonBoardMembers)
  // }



  // makeTableNonBoard(value) {
  //   let tableId = 1;
  //   this.nonBoardMembersTable = [];

  //   for (let i = 0; i < value; i++) {
  //     this.nonBoardMembersTable.push(tableId);
  //     tableId++
  //   }
  // }

  // districtFunds(bool) {
  //   if (bool == 1) {
  //     // this.distFundsRow = 1;
  //     this.distFunds = 1;
  //     // this.makeTableDistFunds();
  //   }
  //   else {
  //     this.distFunds = 0;
  //     // this.makeTableDistFunds();
  //     // this.distFundsTable=[];
  //     // this.distFundsRow = 0;
  //   }
  // alert(bool);
  // }

  // makeTableDistFunds() {
  //   let tableRow = 1;
  //   this.distFundsTable = [];

  //   for (let i = 0; i < this.distFundsRow; i++) {
  //     this.distFundsTable.push(tableRow);
  //     tableRow++
  //   }
  //   // alert(this.distFundsTable)

  // }

  // addDistFunds() {
  //   this.distFundsRow++;
  //   this.distFundsLoc = this.distFundsRow
  //   this.makeTableDistFunds();
  //   // alert(this.distFundsTable)
  // }

  // removeDistFunds(i) {
  //   delete this.distFundsTable[i - 1]
  //   //  alert(this.distFundsTable[this.distFundsTable.length-1])

  //   if (this.distFundsTable.length == 0) {
  //     this.distFunds = 0
  //   }

  //   // alert(this.distFundsTable)
  //   alert(this.secretary_num.value + " " + this.secretary_name.value + " " + this.secretary_email.value)

  //   // alert(this.distFundsTable[this.distFundsTable.length-1])
  // }


}
