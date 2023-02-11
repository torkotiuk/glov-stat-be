<!-- Check in process.env for port number, if it isn't available, set the port by default  -->

# const PORT = process.env.PORT || 5000;

or the same instruction

# const { PORT = 5000 } = process.env;
