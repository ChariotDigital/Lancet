Moralis.Cloud.afterSave( 'JobCancelled', async (request) => {
    const query = new Moralis.Query("JobCreated");
    query
    .equalTo("JobID", request.object.get("jobID"))
    const job = query.first()
    job.set('isComplete', false)
    job.set('isCancelled', true)
    job.save().then(
        (job) => {console.log("Job successfully cancelled and updated")},
        (error) => {console.log("Failed to update database with job cancellation")},
    )
})