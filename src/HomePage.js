import './App.css';
import Environment from './Environment.js';
import React, { useState } from 'react';


function HomePage() {
  // count the number of urls created
  var url_count = 0;
  // count the number of environments created
  var environment_count = 0;

  // use state to store the environments
  const [environments_list, setEnvironments] = useState([]);

  // initial environments
  const initial_environments = ["prev", "acpt", "prod"];

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

  // if environment is checked, add it to the environments list;
  // if environment is unchecked, remove it from the environments list
  function toggle_environment(e) {
    // check if environment is checked
    if (e.target.checked) {
      // if environment is not in the environments list, add it
      if (!environments_list.includes(e.target.value)) {
        setEnvironments([...environments_list, e.target.value]);
      }
    } else {
      // remove environment from the environments list

      // print initial environments
      console.log(environments_list);

      // print what is the list I'm getting after removing the environment
      console.log(environments_list.filter(environment => environment !== e.target.value));

      // set the environments list to the new list
      setEnvironments(environments_list.filter(environment => environment !== e.target.value));

      // print the new environments list
      console.log(environments_list);
    }
  }

  const checkboxes = initial_environments.map((environment) => {
    return (
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id={environment + "-checkbox"} onClick={toggle_environment} value={environment} />
        <label class="form-check-label" for={environment + "-checkbox"}>{environment.toUpperCase()}</label>
      </div>
    )
  }
  )

  return (

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
        {checkboxes}

        <button type="button" class="btn btn-primary" onClick={() => {
          let url = document.createElement('div')
          url.className = 'mb-3'
          // increment the url count
          url_count++;
          url.innerHTML = `
              <div class="mb-1">
            <hr/>
            </div>
            <div class="mb-2">
              <input type="text" class="form-control" id="url-name-${url_count}" placeholder="Website Name" />
              <small class="form-text text-muted">e.g. Third Party System documentation</small>
            </div>
            <div class="mb-2">
              <input type="text" class="form-control" id="url-${url_count}" placeholder="Website URL" />
              <small class="form-text text-muted">e.g. https://thirdpartysystem.com/documentation</small>
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
  );
}

export default HomePage;
