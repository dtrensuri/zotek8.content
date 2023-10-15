import SideBar from "@/components/sideBar/mainSideBar"
const _ = require('lodash')
import "./timeSheet.scss"
export default function TimeSheetLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const sideMenu = {
        'TimeSheet': [
            { title: 'My Timesheet', href: '#', name: '', id: '', class: '', },
            { title: 'My Request', href: '#', name: '', id: '', class: '', },
            { title: 'My Leave', href: '#', name: '', id: '', class: '', },
            { title: 'Member setting', href: '#', name: '', id: '', class: '', },
            { title: 'Holiday', href: '#', name: '', id: '', class: '', }
        ],
        'Manager': [
            { title: 'Confirm request', href: '#', name: '', id: '', class: '', },
            { title: 'Reminder member', href: '#', name: '', id: '', class: '', },
            { title: 'Member leave', href: '#', name: '', id: '', class: '', },
            { title: 'Assign', href: '#', name: '', id: '', class: '', },
            { title: 'Member timesheet', href: '#', name: '', id: '', class: '', },
            { title: 'Member setting', href: '#', name: '', id: '', class: '', }
        ],
        'Help': [
            { title: 'Help', href: '#', name: '', id: '', class: '', },
            { title: 'About', href: '#', name: '', id: '', class: '', },
            { title: 'Feedback', href: '#', name: '', id: '', class: '', },
            { title: 'Calender', href: '#', name: '', id: '', class: '', },
            { title: 'Helpdesk', href: '#', name: '', id: '', class: '', }
        ],
    };

    const sideBarComponents = _.map(sideMenu, (navBarItems: any, sideBarName: any) => (
        <SideBar
            key={sideBarName}
            nameSideBar={sideBarName}
            listNavBar={navBarItems}
        />
    ));

    return (
        <main className="custom-container main-container pt-40 d-flex">
            <div className="main-sidebar">{sideBarComponents}</div>
            <div className="main-content">
                {children}
            </div>

        </main >
    )
}
