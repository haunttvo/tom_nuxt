<template>
    <div>
        <h2>trang kioviet</h2>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        getAccessToken(){
            var data = "client_id=fefe0f2f-b817-41ca-9c7b-894af95ba468&client_secret=7B14D044ECB95369E11241D1172AAA7125B7532E&grant_type=client_credentials";

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
            });

            xhr.open("POST", "https://id.kiotviet.vn/connect/token");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.setRequestHeader("Postman-Token", "07bfbf93-df7b-45a4-9594-f73fd911a8fe");

            xhr.send(data);
        }
    },
    mounted() {
        this.getAccessToken();
    },
}
</script>

