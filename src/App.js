import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Environment from './Environment.js';
import React, { useState } from 'react';


function App() {
  // count the number of urls created
  var url_count = 0;
  // count the number of environments created
  var environment_count = 0;

  // use state to store the environments
  const [environments_list, setEnvironments] = useState([]);

  // initial environments
  const initial_environments = ["prev", "acpt", "prod"];

  // check box html element; onclick, add or remove an environment
  const checkbox = (environment_name) => {
    return (
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value={environment_name} id={environment_name} />
        <label class="form-check-label" for={environment_name}>
          {environment_name}
        </label>
      </div>
    )
  }

  const environments = environments_list.map(environment => {
    return <Environment environmentName={environment} id={environment_count++} />
  }
  );

  function download_project_json() {
    var project_name = document.getElementById("project_name").value;
    var swagger_api = document.getElementById("swagger_api").value;

    // build json object
    var json_object = {
      "project_name": project_name,
      "swagger_api": swagger_api,
      "urls": get_all_urls(),
      "environments": get_all_environments()
    }

    download_json_file(json_object);
  }

  function download_json_file(json_object) {
    var json_string = JSON.stringify(json_object, null, 3);
    var json_blob = new Blob([json_string], { type: "application/json" });
    var json_url = URL.createObjectURL(json_blob);
    var json_link = document.createElement("a");
    json_link.href = json_url;
    json_link.download = json_object["project_name"] + ".json";
    document.body.appendChild(json_link);
    json_link.click();
    document.body.removeChild(json_link);
  }

  function get_all_urls() {
    var urls = [];
    var urls_object = document.getElementById("urls");
    // build array of url objects
    for (var i = 0; i < urls_object.childNodes.length; i++) {
      // get all url names
      var url_name = document.getElementById("url-name-" + (i + 1)).value;
      // get all urls
      var url = document.getElementById("url-" + (i + 1)).value;
      // build url object
      var url_object = {
        "name": url_name,
        "url": url
      }
      // add url object to array
      urls.push(url_object);
    }
    return urls;
  }

  function get_all_environments() {
    var environments = [];
    var environments_object = document.getElementById("environments");
    // build array of environment objects
    var environment_object = {}

    environments_list.forEach((environment) => {
      const extensionKitUrl = document.getElementById(environment + "-extension-kit").value;
      const erpLabUrl = document.getElementById(environment + "-erp-lab").value;
      const swaggerApiUrl = document.getElementById(environment + "-swagger-api").value;
      const companyId = document.getElementById(environment + "-company-id").value;
      const accessTokenUrl = document.getElementById(environment + "-access-token-url").value;
      const clientId = document.getElementById(environment + "-client-id").value;
      const clientSecret = document.getElementById(environment + "-client-secret").value;
      environment_object = {
        "name": environment,
        "extension_kit": extensionKitUrl,
        "erp_lab": erpLabUrl,
        "swagger_api": swaggerApiUrl,
        "authorization": {
          "company_id": companyId,
          "access_token_url": accessTokenUrl,
          "client_id": clientId,
          "client_secret": clientSecret
        }
      };
      environments.push(environment_object);
    }
    );

    // compare environments with initial environments; compare the environment name
    // if environment is not in initial environments, add it as an empty object
    initial_environments.forEach((environment) => {
      if (!environments_list.includes(environment)) {
        environment_object = {
          "name": environment,
          "extension_kit": "",
          "erp_lab": "",
          "swagger_api": "",
          "authorization": {
            "company_id": "",
            "access_token_url": "",
            "client_id": "",
            "client_secret": ""
          }
        };
        environments.push(environment_object);
      }
    }
    );
    return environments;
  }

  // function that toggles the visibility of the placeholder attribute text of all elements in the form
  function toggle_all_placeholder_attributes() {
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.hasAttribute("placeholder")) {
        // store the original placeholder text with reference to the element
        element.setAttribute("data-placeholder", element.getAttribute("placeholder"));
        // remove the placeholder text
        element.removeAttribute("placeholder");
      } else {
        // restore the placeholder text
        element.setAttribute("placeholder", element.getAttribute("data-placeholder"));
      }
    }

  }

  // functions that toggles the selected environment from the list of environments
  function toggle_environment(e) {
    //get sender element
    var sender = e.target;
    // get the environment name
    var environment_name = sender.id.split("-")[0];
    // toggle the environment
    if (sender.checked) {
      // add the environment to the list of environments
      setEnvironments([...environments_list, environment_name]);
    }
    else {
      // remove the environment from the list of environments
      setEnvironments(environments_list.filter(environment => environment !== environment_name));
      console.log(environment_name);
    }
  }

  function test() {
    console.log("test");
  }

  return (
    // add header
    <div className="App">

      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
              </ul>
              {/* Button that has on click that turns off all placeholders */}
              <button class="btn" onClick={toggle_all_placeholder_attributes}>Hide Placeholders</button>
              <div class="ml-auto"></div>
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success" onClick={test} type="button">TEST</button>
              </form>
            </div>
          </div>
        </nav>
        {/* add boostrap class for margin top */}
        <form class="mt-3" >
          <div class="mb-3">
            <input type="text" class="form-control" id="project_name" placeholder="Project Name" />
            <small class="form-text text-muted">e.g. Sandbox Environment</small>
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="swagger_api" placeholder="Swagger API" />
            <small class="form-text text-muted">e.g. https://au01-npe.erpx-api.unit4cloud.com/swagger/?tenant=30713278-9cce-43c9-8816-e59c34e8e5c4</small>
          </div>
          <div id="urls" class="mb-3">
          </div>
          <div class="mb-3 d-flex justify-content-center">
            {initial_environments.map((environment) => {
              return (
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id={environment + "-checkbox"} onClick={toggle_environment} />
                  <label class="form-check-label" for={environment + "-checkbox"}>{environment.toUpperCase()}</label>
                </div>
              )
            }
            )}
            <button type="button" class="btn btn-primary" onClick={() => {
              let url = document.createElement('div')
              url.className = 'mb-3'
              // increment the url count
              url_count++;
              url.innerHTML = `
              <div class="mb-1">
            <label for="url">URL - ${url_count}</label>
            </div>
            <div class="mb-2">
              <input type="text" class="form-control" id="url-name-${url_count}" placeholder="https://au01-npe.erpx-api.unit4cloud.com/swagger/?tenant=30713278-9cce-43c9-8816-e59c34e8e5c4" />
              <small class="form-text text-muted">Enter a URL name</small>
            </div>
            <div class="mb-2">
              <input type="text" class="form-control" id="url-${url_count}" placeholder="https://example.com" />
              <small class="form-text text-muted">Enter URL</small>
            </div>
            `
              document.getElementById('urls').appendChild(url)
            }
            }>Add URL</button>
            {/* add padding inbetween buttons */}
            <div class="mx-3"></div>

            <button type="button" class="btn btn-danger" onClick={() => {
              // get the last url
              let url = document.getElementById('urls').lastChild;
              // remove the last url
              document.getElementById('urls').removeChild(url);
              // decrement the url count
              url_count--;
            }
            }>Remove URL</button>
          </div>
          {/* Button that says 'Add Environment' with onclick method; similar to the one above */}

          <div id="environments" class="mb-3">
            {/* for each environment add an 'Environment' element */}
            {environments}
          </div>

          {/* Button that says 'Add Authorization' with onclick method that adds a label and a textfield to the form */}
          {/* button 'Download Project JSON' with on click method */}
          <button type="button" class="btn btn-primary button-variant" onClick={download_project_json}>Download Project JSON</button>
        </form>
      </div >
    </div >

  );
}

export default App;
