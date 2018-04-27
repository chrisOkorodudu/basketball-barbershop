const wd = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;


const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const driver = new wd.Builder()
    .withCapabilities(wd.Capabilities.chrome())
    .build();


driver.get('http://localhost:3000');

// .then(function() {
//   driver.wait(driver.findElement(wd.By.id('username')).isDisplayed(),
//    10000);
// });


//Test 1: Login form
testLogin();


//Test 2: test for route '/user/:username' (My Posts)
viewMyPosts();

//Test 3: tests View Comments link
viewPost();


//now logout, test register form
driver.findElement(wd.By.id('logout')).click();


//Test 4: tests register form *will only work once unless test username is changed in register function
register();


//test login form
function testLogin() {
  driver.findElement(wd.By.id('username')).sendKeys('chroko14');
  driver.findElement(wd.By.id('password')).sendKeys('00000000');

  driver.findElement(wd.By.id('loginForm')).submit();
}

function viewMyPosts() {
  driver.findElement(wd.By.id('myposts')).click();
}

function viewPost() {
  driver.findElement(wd.By.id('chroko14-lebron-james-should-be-mvp')).click();
}

function register() {
  driver.findElement(wd.By.id('registerLink')).click();

  driver.findElement(wd.By.name('email')).sendKeys('testing@test.com');
  driver.findElement(wd.By.name('username')).sendKeys('testUser');
  driver.findElement(wd.By.name('password')).sendKeys('12345678');
  driver.findElement(wd.By.id('registerForm')).submit()
  .then(
    console.log('all tests successful')
  );
}
