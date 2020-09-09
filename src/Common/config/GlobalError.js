
function globalError (error, request, response, next) {

    if (error instanceof AppError) {
        return response
          .status(error.status)
          .json({ message: error.message });
    }

    response
        .status(400)
        .json({"error": dto});

    response.status(500).json({});
}
