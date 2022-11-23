import { BaseComponent, BaseProps } from "gridjs";
import { useEffect } from "react";
import Charts from "./Charts";




// docs: https://gridjs.io/docs/plugins/advanced-plugins and https://github.com/grid-js/gridjs/issues/502
class GridReadyListener extends BaseComponent{
    constructor(...props) {
        super(...props);
        this.state = {
            keyword: "",
            //charts:<Charts coinsData={coinsData} search={mykeyword}/>
          };
        }
 
    updateKeyword () {
            console.log("updateKeyword");
            const keyword = document.querySelector('[aria-label="Type a keyword..."]').value;
            //setMyKeyword(keyword);
            console.log("keyword");
            console.log(keyword);
            return(keyword)
          }

    setKeyword() {
        this.config.pipeline.process().then(data => {
          this.setState({
            //keyword: data.toArray().reduce((prev, row) => prev + row[1], 0)
            keyword: this.updateKeyword()
          });
        });
      }

    componentDidMount() {
        // initial setState
        this.setKeyword();
        this.config.pipeline.on('updated', this.setKeyword.bind(this));
      }

    render() {
        return undefined;
    }
}

export default GridReadyListener;