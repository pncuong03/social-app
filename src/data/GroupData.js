import group from "../assets/images/img2.jpeg";
import member from "../assets/images/img1.jpeg";
const GroupData = [
    {
        id: 1,
        name: "Group 1",
        image: group,
        members: [
            {
                id: 1,
                name: "Friend 1",
                image: member
            },
            {
                id: 2,
                name: "Friend 2",
                image: member
            },
        ],
        admin: {
            id: 1,
            name: "Admin 1",
            image: member
        },
    },
    {
        id: 2,
        name: "Group 2",
        image: group,
        members: [
            {
                id: 3,
                name: "Friend 3",
                image: member
            },
            {
                id: 4,
                name: "Friend 4",
                image: member
            },

        ],
        admin: {
            id: 1,
            name: "Admin 2",
            image: member
        },
    },

];

export default GroupData;
