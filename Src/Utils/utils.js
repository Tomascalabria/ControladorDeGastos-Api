/**
 * Checks whether the @param username exists in our Database or not, returning a boolean response.
 *
 * @param   location  The array where the user is stored.
 * @param   username  The username you want to check in the array||database.
 * @returns true || false.
 */


const userExists=(location,username)=>{
    return location.find((item)=>{
        return item.friend_username===username 
    })

}

























module.exports={userExists}