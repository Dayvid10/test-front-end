import React from 'react';
import './App.css';
import $ from 'jquery'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {id:'',name:'',email:'',address:'',password:'',students:[],successCreation: null}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.handlePassword = this.handlePassword.bind(this)

    this.handleID = this.handleID.bind(this)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

  };

  componentDidMount(){
    const API_URL = "http://localhost/sms/category/read.php"
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      this.setState({ students: data.records });
    });
  }

  handleSubmit(event){

    var form_data={
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      password: this.state.password
        };
     
        // submit form data to api
        $.ajax({
      url: "http://localhost/sms/operation/create.php",
      type : "POST",
      contentType : 'application/json',
      data : JSON.stringify(form_data),
      success : function(response) {
     
          // api message
     
          // empty form
          this.setState({name: ""});
          this.setState({email: ""});
          this.setState({address: ""});
          this.setState({password: ""});
     
      }.bind(this),
      error: function(xhr, resp, text){
          // show error to console
          console.log(xhr, resp, text);
      }
        });
        alert("Student created!")

    event.preventDefault()
  }

  handleUpdate(event){
    var form_data={
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      password: this.state.password
        };
     
        // submit form data to api
        $.ajax({
      url: "http://localhost/sms/operation/update.php",
      type : "POST",
      contentType : 'application/json',
      data : JSON.stringify(form_data),
      success : function(response) {
          this.setState({successUpdate: response['message']});
      }.bind(this),
      error: function(xhr, resp, text){
          // show error to console
          console.log(xhr, resp, text);
      }
      
        });
        alert("Student Updated!")
     

        event.preventDefault()
  }

  handleDelete(event){
 // student Delete ID

 var studentId = this.state.id
    
 // submit form data to api
  $.ajax({
  url: "http://localhost/sms/operation/delete.php",
  type : "POST",
  contentType : 'application/json',
  data : JSON.stringify({'id':studentId}),
  error: function(xhr, resp, text){
    // show error in console
    console.log(xhr, resp, text);
  }

  });
  alert('Student Deleted!!')

 event.preventDefault()
  }

  handleName(event){
    this.setState({name:event.target.value})
  }

  handleEmail(event){
    this.setState({email:event.target.value})
  }

  handleAddress(event){
    this.setState({address:event.target.value})
  }

  handlePassword(event){
    this.setState({password:event.target.value})
  }

  handleID(event){
    this.setState({id:event.target.value})
  }

  render(){

    const studentDetails = this.state.students

  return (

    <div className="App">
      <header className="App-header">
        <div>
        <form  style={{width:'70%',margin:'80px'}}>
        School Management System  
            <div style={{width:'100%'}}>
                <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'80%' ,textAlign:'center'}} type="text" name="name" onChange={this.handleID}  placeholder="ID Of Student" required></input>
              </div>

              <div style={{width:'100%'}}>
                <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'80%' ,textAlign:'center'}} type="text" name="name" onChange={this.handleName}  placeholder="Name Of Student" required></input>
              </div>
            
              <div style={{width:'100%'}}>
                <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'80%', textAlign:'center' }} onChange={this.handleEmail} type="email" name="email"  placeholder="Email Of Student" required></input>
              </div>

              <div style={{width:'100%'}}>
                <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'80%' , textAlign:'center'}} onChange={this.handleAddress} type="text" name="address"  placeholder="Address Of Student"  required></input>
              </div>

              <div style={{width:'100%'}}>
                <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'80%' , textAlign:'center'}} onChange={this.handlePassword} type="password" name="password"  placeholder="Password Of Student"  required></input>
              </div>

                    
              <div style={{width:'100%',marginTop:'18px'}}>
                <button style={{borderRadius:"30px",fontSize:'28px',width:'100%',background:'black' ,textAlign:'center', color:'white'}} onClick={this.handleSubmit}>Submit</button>
              </div>

              <div style={{width:'100%',marginTop:'18px'}}>
                <button style={{borderRadius:"30px",fontSize:'28px',width:'50%',background:'black' ,textAlign:'center', color:'white'}} onClick={this.handleDelete}>Delete</button>
                <button style={{borderRadius:"30px",fontSize:'28px',width:'50%',background:'black' ,textAlign:'center', color:'white'}} onClick={this.handleUpdate}>Update</button>
              </div>
              </form>

            <div style={{width:'100%'}}>
            <h3>List Of Students</h3>
              <table style={{width:'100%', backgroundColor:'gray',color:'black'}}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Password</th>
                </tr>      
                {studentDetails.map(user => {
              return (
                <tbody>
                  <tr key={user.id.value}>
                    <td style={{backgroundColor:"red"}}>{user.id}</td>
                    <td style={{width:"20%",backgroundColor:"blue"}}>{user.name}</td>
                    <td style={{width:"30%",backgroundColor:"green"}}>{user.email}</td>
                    <td style={{width:"40%",backgroundColor:"orange"}}>{user.address}</td>
                    <td style={{width:"20px",backgroundColor:"purple"}}>{user.password}</td>
                  </tr>
                </tbody>
              );
            })}
              </table>

            </div>
        </div>
      
      </header>
    </div>
  );
}
}
export default App;


