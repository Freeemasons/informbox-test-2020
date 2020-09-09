import React, {Component} from "react";
import {Col, Grid, Row} from "react-flexbox-grid";

const ResetIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9 1.17C13.3244 1.17 16.83 4.67561 16.83 9C16.83 13.3244 13.3244 16.83 9 16.83V18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C5.64428 0 2.71752 1.83656 1.17 4.55937C0.936352 4.97046 0.734144 5.40177 0.566648 5.85L1.72363 6.10242C1.88368 5.70084 2.07602 5.31564 2.29743 4.95C3.66943 2.68426 6.15788 1.17 9 1.17Z" />
    <path d="M9 16.83V18C6.26811 18 3.8205 16.7828 2.16993 14.8611L3 14.0311C4.43633 15.7422 6.59113 16.83 9 16.83Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M1.17 5.13H5.13H6.3V6.3H2.86102e-06V0H1.17V1.17V5.13Z" />
  </svg>
)

class Form extends Component {

  constructor() {
    super();
    this.state = {
      id: true,
      name: true,
      year: true,
      color: true,
      pantone_value: true,
      error: null,
      isLoaded: false,
      data: []
    }
    this.onClickColorReset = this.onClickColorReset.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const rememberState = localStorage.getItem('state');
    this.setState({ ...JSON.parse(rememberState) });

    fetch("https://reqres.in/api/unknown?per_page=12")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.data)
          this.setState({
            isLoaded: true,
            data: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  onClickColorReset = (e) => {
    // console.log('e', e)
    const resetState = {
      id: true,
      name: true,
      year: true,
      color: true,
      pantone_value: true }

    this.setState({...resetState})
    localStorage.setItem('state', JSON.stringify(resetState))
  }


  handleClick = (e) => {

    const currentType = e.target.id;

    this.setState((prevState) => {
       return { [currentType]: !prevState[currentType] }
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))

  }


  render() {

    const { id, name, year, color, pantone_value, data } = this.state;

    // const data = [
    //   {
    //     "page":1,"per_page":12,"total":12,"total_pages":1,
    //     data:
    //       [
    //         {"id":1,"name":"cerulean","year":2000,"color":"#98B2D1","pantone_value":"15-4020"},
    //         {"id":2,"name":"fuchsia rose","year":2001,"color":"#C74375","pantone_value":"17-2031"},
    //         {"id":3,"name":"true red","year":2002,"color":"#BF1932","pantone_value":"19-1664"},
    //         {"id":4,"name":"aqua sky","year":2003,"color":"#7BC4C4","pantone_value":"14-4811"},
    //         {"id":5,"name":"tigerlily","year":2004,"color":"#E2583E","pantone_value":"17-1456"},
    //         {"id":6,"name":"blue turquoise","year":2005,"color":"#53B0AE","pantone_value":"15-5217"},
    //         {"id":7,"name":"sand dollar","year":2006,"color":"#DECDBE","pantone_value":"13-1106"},
    //         {"id":8,"name":"chili pepper","year":2007,"color":"#9B1B30","pantone_value":"19-1557"},
    //         {"id":9,"name":"blue iris","year":2008,"color":"#5A5B9F","pantone_value":"18-3943"},
    //         {"id":10,"name":"mimosa","year":2009,"color":"#F0C05A","pantone_value":"14-0848"},
    //         {"id":11,"name":"turquoise","year":2010,"color":"#45B5AA","pantone_value":"15-5519"},
    //         {"id":12,"name":"honeysuckle","year":2011,"color":"#D94F70","pantone_value":"18-2120"}
    //       ],
    //     "ad":
    //       {
    //         "company":"StatusCode Weekly","url":"http://statuscode.org/",
    //         "text":"A weekly newsletter focusing on software development, " +
    //           "infrastructure, the server, performance, and the stack end of things."
    //       }
    //   }
    // ]



    const tableTemplate = data.map((el, i) => {
      return (
        <tr key={i} >
          <td
            className={this.state.id ? '' : 'invisible'}>
            {el.id}
          </td>
          <td
            className={this.state.name ? '' : 'invisible'}>
            {el.name}
          </td>
          <td className={this.state.year ? '' : 'invisible'}>
            {el.year}
          </td>
          <td className={this.state.color ? '' : 'invisible'}>
            <div style={{backgroundColor: el.color}}
                 className="color-block"></div>
            {el.color}</td>
          <td className={this.state.pantone_value ? '' : 'invisible'}>
            {el.pantone_value}
          </td>
        </tr>
      )
    })

    return (

      <div>
        <Grid>

          <Row>
            <Col lg={12}
                 className="table__head" >
              <div
                className="table__title">
                Pantone colors
              </div>
              <button
                className="btn-color"
                onClick={this.onClickColorReset}
                disabled={id && name && year && color && pantone_value}
              >
                <ResetIcon />
                Reset
              </button>
            </Col>
            <Col lg={12}>
              <table className="color-table">

                  <tbody>
                    <tr>
                      <th className={this.state.id ? '' : 'invisible'}>
                        <input type="checkbox"
                               onChange={this.handleClick}
                               checked={this.state.id}
                               id="id"
                        />
                        Id
                      </th>
                      <th className={this.state.name ? '' : 'invisible'}>
                        <input type="checkbox"
                               checked={this.state.name}
                               onChange={this.handleClick}
                               id="name"/>
                        Name
                      </th>
                      <th className={this.state.year ? '' : 'invisible'}>
                        <input type="checkbox"
                               checked={this.state.year}
                               onChange={this.handleClick}
                        id="year"/>
                        Year
                      </th>
                      <th className={this.state.color ? '' : 'invisible'}>
                        <input type="checkbox"
                               checked={this.state.color}
                               onChange={this.handleClick}
                        id="color"/>
                        Color
                      </th>
                      <th className={this.state.pantone_value ? '' : 'invisible'}>
                        <input type="checkbox"
                               checked={this.state.pantone_value}
                               onChange={this.handleClick}
                        id="pantone_value"/>
                        Pantone value
                      </th>
                    </tr>
                    {tableTemplate}
                  </tbody>
              </table>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Form;
