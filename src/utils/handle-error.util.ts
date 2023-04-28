const handleError = (error: unknown) => {
    const err = error as any

    return err.response &&
        err.response.data &&
        err.response.data.error &&
        err.response.data.error[0]
        ? err.response.data.error[0].context
        : err.message
}

export default handleError