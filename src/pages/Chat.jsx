import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ijaqlpkpvbxkqmfsmhlt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqYXFscGtwdmJ4a3FtZnNtaGx0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MTAxNzk3MSwiZXhwIjoxOTk2NTkzOTcxfQ.jye1ss9UabkmuAUWjBIoDjYXGRr8ODQIRZWc1j4X5gU"
);

function Chat() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user,setUser]=useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const unamefl = localStorage.getItem("username");
    const upassfl = localStorage.getItem("password");
    const uidfl = localStorage.getItem("id");

    if (unamefl != null && uidfl != null && upassfl != null) {
      const { data } = await supabase
        .from("chatUsers")
        .select("*")
        .eq("username", unamefl)
        .eq("password", upassfl)
        .eq("id", uidfl);
      setUsers(data);

      if (data[0] != null) {
        console.log("Online");
        getMessages();
      } else {
        window.location.href = "/";
        localStorage.clear();
      }
    } else {
      window.location.href = "/";
      localStorage.clear();
    }
  }

  async function getMessages() {
    const { data, error } = await supabase.from("chatMessages").select();
    setMessages(data);
    // console.log("M", messages);
    // const d = new Date();
    // console.log(d.getFullYear()+"."+d.getMonth()+"."+d.getDay()+" "+d.getHours()+":"+d.getMinutes());
  }

  async function SettoSupaBase(){
    const d = new Date();
    const { data, error } = await supabase.from("chatMessages").insert([
      {
        created_at: d.getFullYear()+"."+d.getMonth()+"."+d.getDay()+" "+d.getHours()+":"+d.getMinutes(),
        text:document.getElementById("message_text").value,
        sender_id:localStorage.getItem("id"),
        sender_username:localStorage.getItem("username"),
        sender_image:localStorage.getItem("image")
      },
    ]);
    document.getElementById("message_text").value=""
    getMessages();

  }



  getMessages();

  return (
    <div className=" overflow-y-hidden f-screen bg-[url('https://www.pixel4k.com/wp-content/uploads/2021/03/aurora-borealis-beautiful-4k_1615197512-1536x1024.jpg.webp')] bg-cover">
      <div className="rounded bg-transparent h-screen lg:ml-72 lg:mr-72">
        {/* top */}
        <div className="bg-gray-800 rounded  z-10 absolute inset-x-0 top-0 lg:ml-72 lg:mr-72 ">
          <h1 className="text-3xl font-bold text-center pt-5 pb-5">
            Nice Chat
          </h1>
        </div>
        {/* top */}
        
          getMessages()    

        

        <div className="overflow-y-auto backdrop-blur-xl h-full  pt-20 pb-20">
          {messages.map( (message) => {
            
            var pos = 'start';
            if (message.sender_id === localStorage.getItem("id")) {
              pos = 'end';
            }else{
              pos ='start';
            }
            return (
              <div  className={"chat chat-"+pos} key={message.id}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={message.sender_image} />
                  </div>
                </div>
                <div className="chat-header">{message.sender_username}</div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">
                  <time className="text-xs opacity-50">{message.created_at}</time>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom  */}

        <div className="  absolute inset-x-0  bottom-0 lg:ml-72 lg:mr-72">
          <div className="form-control w-full">
            <div className="input-group">
              <input
                type="text"
                id="message_text"
                placeholder="Type Here . . ."
                className="input input-bordered w-full"
              />
              <button className="btn btn-square" onClick={SettoSupaBase}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/susambil-5c917.appspot.com/o/send-svgrepo-com.svg?alt=media&token=8daeac11-3241-4210-af0e-03d3d1acf629"
                  className="m-1"
                  alt="send"
                />
              </button>
            </div>
          </div>
        </div>
        {/* bottom */}
      </div>
    </div>
  );
}

export default Chat;
