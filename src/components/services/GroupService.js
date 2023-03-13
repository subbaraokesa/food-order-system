import axios from "axios";

export class GroupService {
   static serverUrl = process.env.REACT_APP_CONTACT_SERVER_URL ? process.env.REACT_APP_CONTACT_SERVER_URL : "";

    // get all groups
 static getAllGroups(){
        let dataUrl = `${this.serverUrl}/groups`;
        return axios.get(dataUrl);
    }

    // get a Group
 static getGroup(contact){
        let {groupId} = contact;
        let dataUrl = `${this.serverUrl}/groups/${groupId}`;
        return axios.get(dataUrl);
    }
}