Moralis.Cloud.beforeSave( 'JobCreated', async (request) => {
    const query = new Moralis.Query("JobCreated");
    const job = request.object.get('job')
    request.object.set('provider_addr', job[0].toLowerCase())
    request.object.set('buyer_addr', job[1].toLowerCase())
    request.object.set('amount', job[2])
    request.object.set('isComplete', job[3])
    request.object.unset("job")
    
    
})