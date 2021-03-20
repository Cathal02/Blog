import React, { useContext, useState } from 'react';
import { useFollowingIdsQuery,useAddFollowerMutation,FollowingIdsDocument } from '../../generated/graphql';
import UserContext from '../../UserContext';
import { Button, Header, Segment, TransitionablePortal } from 'semantic-ui-react';
import { FollowingDocument } from '../../generated/graphql';


const FollowBlog = ({ blog }) => {
    const [hidden, setHidden] = useState(false);
    const [popup, setPopup] = useState({show: false, content: '', title: '', followComplete: false})
	const user = useContext(UserContext);
	const { data, loading, error } = useFollowingIdsQuery({
		variables: {
			_id: user ? user._id : ''
		}
    });
     const [addFollowerMutation ] = useAddFollowerMutation({
           variables: {
              userId: user ? user._id : '', // value for 'userId'
              blogId: blog ? blog._id : '' // value for 'blogId'
           },
         });

    if(!user) return ''

	const executeFollow =  async () => {
         const res = await addFollowerMutation({refetchQueries: [{
             query: FollowingIdsDocument,
             variables: {
                 _id: user._id
             }
         },
            {query: FollowingDocument,
                variables: {
                    _id: user._id
                }}  
        ]})

            
        if(res.data && res.data.addFollower.success){
            setPopup({show: true, content: <p>{res.data.addFollower.message}</p>, title: 'Follow complete'})

        } else {
            setPopup({show: true, content: <p>{res.data.addFollower.message}</p>, title: 'Follow Error'})
        }
    };
    
    if (hidden || loading) return '';

    if(popup.show){
        return (
            <TransitionablePortal onClose={() => setPopup({...popup, show: false})}open={popup.show}>
            <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                <Header>{popup.title}</Header>
                <p>{popup.content}</p>
            </Segment>
        </TransitionablePortal>
        )
    }
    if (data && data.followingIds?.includes(blog._id)) return '';


    if(!popup.followComplete){
	    return <Button onClick={executeFollow}>Follow Blog</Button>;
    }
};

export default FollowBlog;
