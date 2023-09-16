import axiosHttp from "@/utils/http";

export const upload = (dataForm: FormData) => {
   return  axiosHttp.request( {
                url: "/file/upload",
                data: dataForm,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
}


export const handleSubmit = (dataForm: FormData) => {
    return  axiosHttp.request( {
            url: "https://l7z033r4oh.execute-api.ap-east-1.amazonaws.com/create-codingchallengedb",
            method: 'POST',
            headers: {
                'X-Requested-With':'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
            },
            data: {
                id: dataForm.get("id"),
                input_text: dataForm.get("input_text"),
                input_file_path: dataForm.get("input_file_path"),
            }
        }
    )

}


export const getFile = (id="") => {
    return  axiosHttp.request( {
            url: "/file/"+id,
            method: 'GET',
            headers: {
                'X-Requested-With':'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }
    )

}



