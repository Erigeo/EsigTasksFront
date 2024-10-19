<template>
    <div class="flex flex-col items-center justify-center bg-gray-100 rounded-xl w-[450px] h-[500px] shadow-md ">
        <img src="../assets/teste 1.svg" class="w-[300px] h-[200px]">
        <form @submit.prevent=""   >
            <div class="flex-col flex m-5 w-[300px]">
                <label class="flex items-start">Email</label>
                <input class="  border-b-[1px] border-black bg-transparent outline-none">
            </div>
            <div class="flex-col flex m-5  ">
                <label class="flex items-start">Password</label>
                <input type="password" class="  border-b-[1px] border-black bg-transparent outline-none">
                
            </div>

            <button class="items-center justify-center w-[300px] h-[50px] bg-red-600 rounded-md font-bold text-white mt-2">Sign in</button>
           
            
        </form>
        <div class="flex items-center mt-5">
                <h3>Don't have an account yet?</h3>
                <h3 @click="showSignUp = true" class="ml-2 text-blue-500 underline cursor-pointer">Sign up</h3>
            </div>
        
    </div>
</template>

<script>
export default {
  name: 'LoginComponent',
};
</script>