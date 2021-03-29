## Currency Converter notes

Even though the spec didn't mention creating more than a single component, I decided to break out the converter rows into separate ConverterRow component. It didn't necessarily make the code more concise, but added some flexibility and modularity. We could dynamically create rows and pass props to them to set their attrs. The info is now in the CurrencyConverter, but could be imported from a JSON file or another JS file. I really hope that's not "over-engineering", but felt it would look worse if I just left one bulky component just asking to be broken apart.

I had some trouble working with the API--couldn't find a non-hacky endpoint on the site, but dug one up from the test suite. Handling the error from the API on unsuccessful request was tricky in the sense that the message was nested deep inside the returned error object, and honestly, my console in wasn't logging out the structure of the object even as I tried to console.log it. I needed to look the object structure up online to see the message was nested as "err.response.data.error". Then it was a matter of setting the state variable "conversion result" to that message. 

Another challenge was getting the API call not to happen inside of useEffect on initial component render, but I figured that out with the help of a useRef that stored a flag for me controlling whether that useEffect was already run on that mount cycle. The first run, on load, changes the flag, and that flag controls whether we want to make the API call. 

There may be unnecessary method calls on the input strings (also exported to a formatters file in a util folder), for instance I create substrings without checking if the length exceeds a given value, but what's lost in performance--I was hoping could be made up for in code readability.

Considered adding some convenience to date input to have dashes be autofilled as the user types. Was not in the spec, and also had trouble on backspace presses. Wanted to add a condition to have the value on the field be rendered differently on backspace press, but hit a block, since onChange on inputs has no keyCode prop. 

Again, I am sorry if the code fails the test suite--I quickly moved the stubs to my VSCode environment and worked from there. I have uploaded a working example of the app to netlify to show that, even if there is a mismatch between the tests and the code, the code itself works ok live and passes all manual, functional tests, as far as I can see.

I used the "no-semi" style for this, but have no problem working with semicolons otherwise.

In case something gets messed up with the source code here, I posted it on my github as well for reference. I altered the project structure there slightly.

### NETLIFY 
https://react-currency-converter-demo-adi.netlify.app/

### GITHUB 
https://github.com/adiforka/currency-converter