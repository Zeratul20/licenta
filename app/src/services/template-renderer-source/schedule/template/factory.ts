import { TemplateRenderFactory } from "../../helpers/index";
// import logo from "../../../../assets/img/school-logo.png";

const logo = ""

const startHour = 8;
const endHour = 19;
const days = ["Lu", "Ma", "Mi", "Jo", "Vi"];

const addHeader = (logo: any, type: string, generalData: any) => {
  let out = ``;
  const padding = type === "class" ? "250px" : "225px";
  out += `
    <div class="header-container" >
      <div class="logo-container">
          <img src=${logo} alt="">
      </div>
      <div class="title-container">
          <h2 style="padding-left: ${padding};">
              Orar
          </h2>
          <h3 style="font-size: smaller; padding-left: ${padding};">
              ${
                type === "class"
                  ? `Clasa ${generalData.className}`
                  : `Profesor ${generalData.teacherName}`
              }
          </h3>
      </div>
    </div>
  `;
  return out;
};

const getScheduleClassSection = (data: any, type: string) => {
  let out = ``;
  if (type !== "class") return out;
  out += `
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          ${Array.from(
            { length: endHour - startHour + 1 },
            (_, i) => i + startHour
          ).map((hour) => {
            return `<th className="text-center" scope="col" style={{}}>
                ${hour}
              </th>`;
          })}
        </tr>
      </thead>
      <tbody>


      ${days.map((day: string) => {
        return `<tr>
            <th scope="row" style="width: 7px;">${day}</th>
            ${Array.from(
              { length: endHour - startHour + 1 },
              (_, i) => i + startHour
            ).map((hour) => {
              const subjectFound = data.find(
                (el: any) => el.day === day && el.hour === hour
              );
              const { teacherName, subject, backgroundColor } =
                subjectFound || {};
              return `
                  ${
                    subjectFound
                      ? `
                      <td style="background-color: ${backgroundColor}; width: 20px;">
                        <div className="text-center">
                          ${teacherName}
                        </div>
                        <div className="text-center">
                          ${subject}
                        </div>
                      </td>
                    `
                      : `<td style="width: 10px;"></td>`
                  }
                `;
            })}
          </tr>
        `;
      })}
      </tbody>
    </table>
  `;
  return out;
};

const getScheduleTeacherSection = (data: any, type: string) => {
  let out = ``;
  if (type !== "teacher") return out;
  out += `
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          ${Array.from(
            { length: endHour - startHour + 1 },
            (_, i) => i + startHour
          ).map((hour) => {
            return `<th className="text-center" scope="col" style={{}}>
                ${hour}
              </th>`;
          })}
        </tr>
      </thead>
      <tbody>

        ${days.map((day: string) => {
          return `<tr>
              <th scope="row">${day}</th>
              ${Array.from(
                { length: endHour - startHour + 1 },
                (_, i) => i + startHour
              ).map((hour) => {
                const subjectFound = data.find(
                  (el: any) => el.day === day && el.hour === hour
                );
                const { className, backgroundColor } = subjectFound || {};
                return `
                    ${
                      subjectFound
                        ? `
                        <td style="background-color: ${backgroundColor}">
                          <div className="text-center">
                            ${className}
                          </div>
                        </td>
                      `
                        : `<td></td>`
                    }
                  `;
              })}
            </tr>
          `;
        })}


      </tbody>
    </table>
  `;
  return out;
};

export const templateFactory: TemplateRenderFactory = () => {
  return {
    body: ({ data, type, generalData }: any) => {
      return `
            <!DOCTYPE html>
            <html style="overflow-x: scroll; overflow-y: hidden;">
                <head>
                    <title>Orar</title>
                </head>
                <body >
                  <div class="page-wrapper">
                    <div class="data-body">
                      ${addHeader(logo, type, generalData)}
                      ${
                        type === "class"
                          ? getScheduleClassSection(data, type)
                          : getScheduleTeacherSection(data, type)
                      }
                    </div>
                  </div>
                </body>
            </html>
        `;
    },
  };
};
