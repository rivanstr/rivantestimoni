"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin(){
  const [login,setLogin]=useState(false);
  const [pass,setPass]=useState("");
  const [title,setTitle]=useState("Rivan Store");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState<File|null>(null);
  const [loading,setLoading]=useState(false);

  const handleLogin=()=>{
    if(pass==="rivan123") setLogin(true);
    else alert("Password salah! Default: rivan123");
  }

  const handleUpload=async()=>{
    if(!file) return alert("Pilih gambar dulu!");
    setLoading(true);
    const name=`${Date.now()}-${file.name}`;
    const {error:upErr}=await supabase.storage.from("testi-images").upload(name,file);
    if(upErr){ alert(upErr.message); setLoading(false); return; }
    const {data}=supabase.storage.from("testi-images").getPublicUrl(name);
    const {error}=await supabase.from("testimonials").insert({title, description:desc, image_url:data.publicUrl, likes:2});
    setLoading(false);
    if(error) alert(error.message);
    else { alert("Berhasil upload! Cek galeri"); setDesc(""); }
  }

  if(!login){
    return(
      <div className="min-h-screen bg-[#D6EEFF] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <h1 className="font-black text-[#2A5A8A]">🔐 Login Admin</h1>
          <p className="text-xs text-gray-400 mt-1">Password: rivan123</p>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password admin" className="mt-4 w-full border rounded-full px-4 py-3 text-sm"/>
          <button onClick={handleLogin} className="mt-4 w-full bg-[#6BA6E0] text-white py-3 rounded-full font-bold">Masuk</button>
          <a href="/" className="block text-center text-xs text-gray-400 mt-3">← Kembali ke Galeri</a>
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-[#D6EEFF] p-6">
      <div className="max-w-[500px] mx-auto bg-white rounded-[24px] p-6">
        <h1 className="font-black text-[#2A5A8A]">Upload Testimoni Baru</h1>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul" className="mt-4 w-full border rounded-full px-4 py-3 text-sm"/>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Deskripsi: SOLD 3 MENIT = 15K" className="mt-3 w-full border rounded-2xl px-4 py-3 h-24 text-sm"/>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="mt-3 w-full text-sm"/>
        <button onClick={handleUpload} disabled={loading} className="mt-4 w-full bg-[#E5B44F] py-3 rounded-full font-bold">{loading?"Uploading...":"Upload Sekarang"}</button>
        <a href="/" className="block text-center text-sm text-[#6BA6E0] mt-4 font-bold">Lihat Galeri →</a>
      </div>
    </div>
  )
}
