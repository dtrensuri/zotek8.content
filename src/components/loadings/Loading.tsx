import './loading.scss';

const Loading = () => {
    return (
        <div className='bg-cover-loading'>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading;