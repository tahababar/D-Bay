import {useContext} from "react";
import {Avatar, List} from "antd";
import moment from "moment";
import {useRouter} from "next/router";
import { UserContext } from "../../context";
import Link from "next/link";

const People = ({people,handleFollow,handleUnfollow})=>{
    const [state, setState] = useContext(UserContext);
    const router = useRouter();
//usign List from antd 
    return(
        <>
        
        <List
        
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
            
            
            //avatar={<Avatar src={user.name[0]}/>}
            avatar = {<Avatar size={40}>{user.name[0]}</Avatar>}
            title={
                <div className="d-flex justify-content-between">
                  <Link href={`/user/${user.username}`}>
                    <a>{user.username}</a>
                  </Link>
                  {state &&
                  state.user &&
                  user.followers &&
                  user.followers.includes(state.user._id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="text-primary pointer"
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className="text-primary pointer"
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
            />
          </List.Item>
          
        )}
      />

        </>
    )
}
//pointer in classname is the style in style.css to apply here
export default People;