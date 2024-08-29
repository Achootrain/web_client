import {Form,Input} from 'antd'
function Comment({ username,comment,avatar,isFeedback,editable,onSubmit,form,date }) {
  const getusername=()=>{
    if(username){
        return username;
    }
    else return "Username";
  }
  const getcomment=()=>{
    if(comment){
        return comment;
    }
    else return "Comment";
  }
  const getavatar=()=>{
    if(avatar){
        return avatar;
    }
    else return "https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png";
  }
  const getDate=()=>{
    if(date){
        return date;
    }
    else return "Date";
  }
  if(!isFeedback){isFeedback=false}
  if(!editable){editable=false}
  

  return (
    <div className={`bg-white border-2 border-slate-500 rounded-md p-2 w-4/5 `}>
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-row">
            <img className="h-8 w-8 "src={getavatar()}></img>
            <div className="relative font-bold left-2  text bg-slate-800 rounded-md text-white p-1">{getusername()}</div>
            {isFeedback&&(<div className="relative  left-2 p-1">{getDate()}</div>)}
        </div>
      {!editable&&(  
     <div className={`relative text-white text-sm ml-10 p-1 bg-slate-800 rounded-md text-justify
      `}>{getcomment()}</div>)}

      {editable&&(  
        <Form form={form}>
        <Form.Item  
          className={`relative text-white text-sm ml-10 p-1 bg-slate-800 rounded-md 
          ${(isFeedback ?? true) ? 'h-48' : ''}
          `}
              label=""
              name="comment"
                >
              <div className="flex flex-row">
                <Input.TextArea row={1} className="bg-slate-200" style={{ height: isFeedback ? '11.5rem' :'1px' }} placeholder="Say something ...">
                </Input.TextArea> 
                <button className="self-end ml-2" onClick={onSubmit}><img className="h-5 w-5 hover:opacity-50" src="https://i.ibb.co/qDGPG7c/sent.png"></img></button>
              </div>
          </Form.Item>
          </Form>

      )}


   
    
      </div>
    </div>
  );
}

export default Comment;