# DataFizz
**Matthew Bruns** 
**8/29/2018**

##How to Run:
After cloning the project on a computer with NodeJS installed and a working Internet connection, move to its directory. On the command line, one can execute
*node ./Data_Fizz_Crawler_Matthew_Bruns.js https://www.amazon.com books*
The third argument is required to be books for the crawler to function properly, as the code was specialized for this particular instance. As described in the 

##General Principle:
The main technique used to ensure correct execution order in the context of the crawler itself is recursive calling. By making sure that functions are recursive, we can be certain that the websites will load in order while being able to pass data from HTTP request to HTTP request.