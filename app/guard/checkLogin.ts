import axios from "axios";
import { useRouter } from "next/router";

const router = useRouter();

const handleCheckLogin = async () => {
    axios.request({
        method: 'HEAD',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        url: `http://localhost:8080/api/user/check-login`,
        responseType: 'json',
        data: {
            'userId': localStorage.getItem('userId'),
        }
    }).catch(() => {
        return router.push('/login');
    });
}

const checkToken = () => {
    console.log(localStorage.getItem('accessToken') == null);
    if (localStorage.getItem('accessToken') == null || localStorage.getItem('accessToken') == undefined) {
        return router.push('/login');
    } else {
        handleCheckLogin();
    }
};

export default checkToken;