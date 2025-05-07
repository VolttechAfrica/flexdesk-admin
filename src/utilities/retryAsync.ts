

const retryAsync = async<T>(
    fn: ()=> Promise<T>,
    retries = 3,
    delays = 1000
): Promise<T> => {
    
    let attempt = 0;
    while(attempt <= retries) {
        try{
            return await fn();
        }catch(error) {
            if (attempt === retries) throw error;
            await new Promise((res) =>setTimeout(res, delays));
            attempt ++;
        }
    }

    throw new Error("failed after maximum retry attempts");

}

export default retryAsync