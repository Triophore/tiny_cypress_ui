<template>
    <div>
        
    </div>
</template>

<script>
export default {
    mounted() {
        setTimeout(async () => {
            await this.$auth.logout();
            this.$router.push('/login');
        }, 0);       
    },
}
</script>