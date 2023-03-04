import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
const App=()=> 
{
  let [data,updateData]=useState([]);
  let [form,updateForm]=useState({id:"",name:"",price:"",cat:"",cmp:""});
  let [show,updateShow]=useState({id:"",name:"",price:"",cat:"",cmp:""});
  useEffect(()=>{
    axios.get("https://tanveerpp.pythonanywhere.com/product/")
    .then((res)=>{
      updateData(res.data)
    })
    .catch((err)=>{
      console.log(err.message);
    })
  })
  const change=(e)=>{
    updateForm({...form,[e.target.name]:e.target.value});
  }
  return (
    <>
    <div className="border border-secondary box mb-2">
      <div className='input-group'>
        <input className='form-control' type="number" name="id" value={show.id} placeholder="enter search id" onChange={(e)=>updateShow({...show,[e.target.name]:e.target.value})} />
        <button className='btn btn-primary ms-2 ' onClick={()=>{
          async function serch()
          {
            var sres=await axios.get(`https://tanveerpp.pythonanywhere.com/product/${show.id}/`);
            updateShow(sres.data);
          }
          serch();
        }}>search</button><br/>
      </div><br/>
      <h3>{show.name} {show.price} {show.cat} {show.cmp}</h3>
    </div>
    <table className='table table-bordered table-center'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>PRICE</th>
          <th>CATEGORY</th>
          <th>COMPANY</th>
        </tr>
      </thead>
      <tbody>
        {data.map((v)=>{
          return (
              <tr key={v.id} >
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.price}</td>
                <td>{v.cat}</td>
                <td>{v.cmp}</td>
                <td><button className='btn btn-danger' onClick={()=>{
                  async function deleteData()
                  {
                    var dd=await axios.delete(`https://tanveerpp.pythonanywhere.com/product/${v.id}/`)
                    if(dd.status===204)
                    {
                      window.alert("Data Deleted Successfully");
                    }
                  }
                  deleteData()
                }}>Delete</button></td>
                <td><button className='btn btn-warning' onClick={()=>{
                  updateForm({...v})
                }}>Update</button></td>
              </tr>
          )
        })}
      </tbody>
    </table>
    <form onSubmit={(e)=>{
      e.preventDefault();
      if(form.id==="")
      {
        async function postData()
        {
          var fd=await axios.post("https://tanveerpp.pythonanywhere.com/product/",form);
          if(fd.status===201)
          {
            window.alert("Data added Successfully");
            updateForm({id:"",name:"",price:"",cat:"",cmp:""});
          }
        }
        postData();
      }
      else
      {
        async function updateData()
        {
          var fd=await axios.put(`https://tanveerpp.pythonanywhere.com/product/${form.id}/`,form);
          if(fd.status===200)
          {
            window.alert("Data updated Successfully");
            updateForm({id:"",name:"",price:"",cat:"",cmp:""});
          }
        }
        updateData();
      }
    }}>
      <div className="mt-3 mb-1">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" name='name' value={form.name} onChange={change} placeholder="enter your name" />
      </div>
      <div className="mb-1">
        <label className="form-label">Price</label>
        <input type="text" className="form-control" name='price' value={form.price} onChange={change} placeholder="enter your price" />
      </div>
      <div className="mb-1">
        <label className="form-label">Category</label>
        <input type="text" className="form-control" name='cat' value={form.cat} onChange={change} placeholder="enter your Category" />
      </div>
      <div className="mb-1">
        <label className="form-label">Company</label>
        <input type="text" className="form-control"  name='cmp' value={form.cmp} onChange={change} placeholder="enter your Company" />
      </div>
      {form.id===""?<button className="mt-2 btn btn-primary">Submit</button>:<button className="mt-2 btn btn-success">Update</button>}
    </form>
    </>
  );
}

export default App;
