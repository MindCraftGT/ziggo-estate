import express from "express";

const app = express();

app.listen(3000, () => {
	console.log(
		"Serve Running on Port 3000, Nice Toast!",
	);
});
