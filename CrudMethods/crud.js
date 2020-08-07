
const create= async (collection,data)=>{
    try{
        const info = new collection(data)
        const save=await info.save(data)
    return {error:false,data:save,created: true}
    }catch(err){
  return {error: true,data :err,created: false}
    }
    
}
const readone= async (collection,data)=>{
    try{
     const read = await collection.find(data)
    
     if(read.length==0){
     return {
         error:false,
         data:read,
         find:false
        }
    }
        else{
         return{  
              error:false,
            data:read,
            find:true
           }
        }
    }catch(err){
  return{
      error:true,
      data:err,
      find:false}
    }
}
const readall = async (collection)=>{
    try{
    const read = await collection.find({})
    return {
        error:false,
        data:read
    }   
    }
    catch(err){
        console.log(err)
        return {
            error:true,
            data:err
        }
    }
}
const update=async (collection,_id,data)=>{
    try{
        if(_id==undefined) throw new Error("id is not set")
    const Update = await collection.findByIdAndUpdate(_id,data)
    return { error:false ,data:data,updated:true}
    }
    catch(err){
  return {error:true,data:err,updated:false}
    }
}
const Delete=async (collection,id)=>{
    try{
        if(id==undefined) throw new Error("id is not set")
     const remove= await collection.findByIdAndDelete(id)
     if(remove!=null){
       return {error:false,data:remove,deleted:true}
     }
      else{
        return {error:false,data:remove,deleted:false}
      }
    }
    catch(err){
        console.log(err)
        return{error:true,data:err,deleted:false}
    }
}
module.exports={create,readall,readone,update,Delete}