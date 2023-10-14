import data from "../../submissionData.json"; // do not create this file
// let data = [{ submission_link: "http://localhost:8080/", id: 67890 }];

// import { start, submitData } from "../../../data";
describe("Test", function () {
  let acc_score = 1;

  data.map(({ submission_link: url, id }) => {
    if (url.charAt(url.length - 1) != "/") {
      url = url + "/";
    }
    if (url && url.length) {
      it("Checking text alignment in the heading", () => {
        cy.visit(url);
        cy.get("h1")
          .should("have.css", "text-align", "center")
          .then(() => {
            acc_score += 2;
          });
      }); //2

      it("Checking flex length in the top-section", () => {
        cy.visit(url);
        cy.get("#music-cards")
          .children()
          .should("have.length", 4)
          .then(() => {
            acc_score += 1;
          });
      }); //1

      it("Checking flex length in the medium-section", () => {
        cy.visit(url);
        cy.get("#guests")
          .children()
          .should("have.length", 3)
          .then(() => {
            acc_score += 1;
          });
      }); //1

      it("Checking flex length in the bottom-section", () => {
        cy.visit(url);
        cy.get("#albums")
          .children()
          .should("have.length", 5)
          .then(() => {
            acc_score += 1;
          });
      }); //1

      it("Checking text alignment in the top-section", () => {
        cy.visit(url);
        cy.get("#music-cards>div h4")
          .should("have.css", "text-align", "center")
          .then(() => {
            acc_score += 0.5;
          });
        cy.get("#music-cards>div p")
          .should("have.css", "text-align", "center")
          .then(() => {
            acc_score += 0.5;
          });
      }); // 1

      it("Checking text alignment in the middle-section", () => {
        cy.visit(url);
        cy.get("#guests>div h3")
          .should("have.css", "text-align", "center")
          .then(() => {
            acc_score += 0.5;
          });
        cy.get("#guests>div p")
          .should("have.css", "text-align", "center")
          .then(() => {
            acc_score += 0.5;
          });
      }); // 1

      it("Checking image border radius in medium section ", () => {
        cy.visit(url);
        cy.get("#guests div img")
          .should("have.css", "border-radius", "50%")
          .then(() => {
            acc_score += 2;
          });
      }); //2
    }

    it(`generate score`, () => {
      //////////////
      let result = {
        id,
        marks: Math.floor(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});
