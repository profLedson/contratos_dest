import avatar from '../../public/logo-sesp.png'

function Topbar() {
    return (
        <div className='flex justify-end p-2 bg-gray-200 border-b border-gray-50'>            
            <div className="flex flex-col">
                <div className="flex gap-2">
                    <h3>Olá, Usuário!</h3>
                    <div className=" w-7">
                        <img className="rounded-full" src={avatar} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar