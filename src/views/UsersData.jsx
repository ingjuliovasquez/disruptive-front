export default function UsersData() {
    return (
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-lg">Datos de usuarios</h1>
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Usuario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tipo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contenido
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            Test
                        </th>
                        <td className="px-6 py-4">
                            Lector
                        </td>
                        <td className="px-6 py-4">
                            249
                        </td>
                    </tr>
                   
                </tbody>
            </table>
        </div>
      </div>
    )
  }
  