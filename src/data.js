// const data = {
//   tasks: {
//     "task-1": {
//       id: "task-1",
//       content: "create a moday interface",
//       owner: "Manuel",
//       status: "In Progress",
//       dueDate: "2020-2-2",
//       priority: "high"
//     },
//     "task-2": {
//       id: "task-2",
//       content: "enjoy the moday interface",
//       owner: "Bader",
//       status: "Upcoming",
//       dueDate: "2020-2-2",
//       priority: "medium"
//     },
//     "task-3": {
//       id: "task-3",
//       content: "nothing else to do",
//       owner: "Manuel",
//       status: "Done",
//       dueDate: "2020-2-2",
//       priority: "low"
//     },
//     "task-4": {
//       id: "task-4",
//       content: "drive a tesla",
//       owner: "Musk",
//       status: "In Progress",
//       dueDate: "2020-2-2",
//       priority: "medium"
//     }
//   },
//   groups: {
//     "group-1": {
//       id: "group-1",
//       title: "Baims",
//       taskIDs: ["task-1", "task-2", "task-3", "task-4"]
//     }
//   },
//   groupOrder: ["group-1"]
// };

const data = {
  members: [
    {
      id: 1,
      name: "Manuel",
      pic:
        "https://format-com-cld-res.cloudinary.com/image/private/s--nHDGSD97--/c_limit,g_center,h_550,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/accdfbbd9f44e8b739925b9bb184ce74/14_Boelitz-PortraitsandPeople-2018.jpg",
      color: "green"
    },
    {
      id: 2,
      name: "Badr",
      pic:
        "https://format-com-cld-res.cloudinary.com/image/private/s--nHDGSD97--/c_limit,g_center,h_550,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/accdfbbd9f44e8b739925b9bb184ce74/14_Boelitz-PortraitsandPeople-2018.jpg",
      color: "maroon"
    },
    {
      id: 3,
      name: "Elon",
      pic:
        "https://format-com-cld-res.cloudinary.com/image/private/s--nHDGSD97--/c_limit,g_center,h_550,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/accdfbbd9f44e8b739925b9bb184ce74/14_Boelitz-PortraitsandPeople-2018.jpg",
      color: "orange"
    }
  ],

  tasks: [
    {
      id: "1",
      content: "create a moday interface",
      owner: 1,
      ownerName: "Manuel",
      ownerPic:
        "https://format-com-cld-res.cloudinary.com/image/private/s--nHDGSD97--/c_limit,g_center,h_550,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/accdfbbd9f44e8b739925b9bb184ce74/14_Boelitz-PortraitsandPeople-2018.jpg",
      ownerColor: "green",
      status: "In Progress",
      dueDate: "2020-2-2",
      priority: "high"
    },
    {
      id: "2",
      content: "enjoy the moday interface",
      owner: 2,
      ownerName: "Bader",
      ownerColor: "maroon",
      ownerPic:
        "https://format-com-cld-res.cloudinary.com/image/private/s--nHDGSD97--/c_limit,g_center,h_550,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/accdfbbd9f44e8b739925b9bb184ce74/14_Boelitz-PortraitsandPeople-2018.jpg",
      status: "Upcoming",
      dueDate: "2020-2-2",
      priority: "medium"
    },
    {
      id: "3",
      content: "nothing else to do",
      owner: 1,
      ownerName: "Manuel",
      ownerPic:
        "https://format-com-cld-res.cloudinary.com/image/private/s--nHDGSD97--/c_limit,g_center,h_550,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/accdfbbd9f44e8b739925b9bb184ce74/14_Boelitz-PortraitsandPeople-2018.jpg",
      status: "Done",
      dueDate: "2020-2-2",
      priority: "low"
    },
    {
      id: "7",
      content: "drive a tesla",
      owner: 3,
      ownerName: "Musk",
      ownerPic:
        "https://format-com-cld-res.cloudinary.com/image/private/s--nHDGSD97--/c_limit,g_center,h_550,w_65535/a_auto,fl_keep_iptc.progressive,q_95/v1/accdfbbd9f44e8b739925b9bb184ce74/14_Boelitz-PortraitsandPeople-2018.jpg",
      status: "In Progress",
      dueDate: "2020-2-2",
      priority: "medium"
    }
  ],
  groups: [
    {
      id: "c1",
      title: "BAIMS",
      taskIDs: ["1", "2", "3", "7"],
      color: "red"
    },
    {
      id: "c2",
      title: "CODED",
      taskIDs: [],
      color: "blue"
    },
    {
      id: "c3",
      title: "FOTOMATIC",
      taskIDs: [],
      color: "green"
    }
  ],
  groupOrder: ["c1", "c2", "c3"]
};

export default data;
