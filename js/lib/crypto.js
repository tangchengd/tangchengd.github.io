mixins.crypto = {
    data() {
        return { crypto: "", cryptoStatus: "" };
    },
    watch: {
        crypto(value) {
            let input = this.$refs.crypto,
                content = this.$refs.content;
            let { encrypted, shasum } = input.dataset;
            try {
                const key = CryptoJS.MD5(value);
                const iv  = CryptoJS.MD5(value + value);
                let decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
                if (CryptoJS.SHA256(decrypted).toString() === shasum) {
                    this.cryptoStatus = "success";
                    content.innerHTML = decrypted;
                    this.render();
                    window.dispatchEvent(new CustomEvent("crypto-decrypted"));
                } else this.cryptoStatus = "failure";
            } catch {
                this.cryptoStatus = "failure";
            }
        },
    },
};
