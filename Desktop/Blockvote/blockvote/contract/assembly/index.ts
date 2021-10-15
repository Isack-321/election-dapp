

import {  logging, PersistentMap } from 'near-sdk-as'

  const candidateUrl= new PersistentMap<string,string>("candidateUrl");
  const candidatePair= new PersistentMap<string,string[]>("candidatePair");
  const promptArray= new PersistentMap<string,string[]>("promptArray");
  const voteArray= new PersistentMap<string,i32[]>("voteArray");
  const userParticipation= new PersistentMap<string,string[]>("userParticipation");




//view methods
//do not change the state of the blockchain
//does not incur a fee
//pulls and reads information from blockchain
  export function getUrl(name:string):string{
    if(candidateUrl.contains(name)){
      return candidateUrl.getSome(name);
    } else{
    return ''}
  }

  export function didParticipate(prompt:string,user:string):bool{
    if(userParticipation.contains(prompt)){
      let getArray= userParticipation.getSome(prompt);
      return getArray.includes(user);

    }
    else{
      logging.log('prompt not found!');
      return false;
    }

  }
  export function getAllPrompts():string[]{
    if(promptArray.contains('AllArrays')){
      return promptArray.getSome("AllArrays");

    }
    else{
      logging.log('no prompts found')
      return []
    }
  }

  export function getVotes(prompt:string):i32[]{
    if(voteArray.contains(prompt)){
      return voteArray.getSome(prompt)
    }
    else{
      logging.log('prompt not found for this vote')
      return [0,0]
    }
  }

  export function getCandidatePair(prompt:string):string[]{

    if(candidatePair.contains(prompt)){

      return candidatePair.getSome(prompt) 
    }
    else
    {
      logging.log('no prompt')
      return []
    }
    

  }
//change methods
//change the state of the blockchain
//creates a transaction fee to do so
//Adds or modifies infromation to the blockchain

export function addUrl(name:string,url:string):void{

  candidateUrl.set(name,url);
  logging.log("added url for:"+name);
}
export function addCandidatePair(prompt:string,name1:string,name2:string):void{
  candidatePair.set(prompt,[name1,name2]);

}

export function addToPromptArray(prompt:string):void{
  logging.log("added to array");
    

    if(promptArray.contains("AllArrays")){
      let tempArray= promptArray.getSome("AllArrays")
        tempArray.push(prompt)
    }
    else{
      promptArray.set("AllArrays",[])
    }
}
export function addVote(prompt:string,index:i32):void{
  if(promptArray.contains(prompt)){
    let tempArray=voteArray.getSome(prompt);
    let tempVal=tempArray[index];
    let newVal= tempVal+1;
      tempArray[index]=newVal;
      voteArray.set(prompt,tempArray);
  }
  else{
    let newArray=[0,0];
    newArray[index]=1;
    voteArray.set(prompt,newArray);
  }
}

export function recordUser(prompt:string,user:string):void{
  if (userParticipation.contains(prompt)){
    let tempArray= userParticipation.getSome(prompt);
    tempArray.push(user);
    userParticipation.set(prompt,tempArray);

  }
  else{
    userParticipation.set(prompt,[user]);
  }

}