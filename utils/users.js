var users   = [];

/**
 * Join User
 * 
 * @param string id 
 * @param string username 
 * @param string room 
 * 
 * @return object user 
 */
function joinUser(id, username, room)
{
    var user    = {id, username, room};
    users.push(user);
    return user;
}

/**
 * Get User
 * 
 * @param string id 
 * 
 * @return object user 
 */
function getUser(id) 
{
    return users.find(user => user.id === id);    
}

/**
 * Leave User
 * 
 * @param string id 
 * 
 * @return object users
 */
function leaveUser(id)
{
    var index   = users.findIndex(user => user.id == id);
    if(index != -1){
        return users.splice(index, 1)[0];
    }
}

/**
 * Get Room Users
 * @param string room 
 * 
 * @return array users 
 */
function getRoomusers(room) 
{
//    return [room];
    return users.filter(user => user.room === room);    
}

module.exports  = {
    joinUser, getUser,leaveUser, getRoomusers
}