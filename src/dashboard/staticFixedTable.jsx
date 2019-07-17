
import React from 'react';

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

export default class StaticFixedTable extends React.Component{
    render(){
        return(
            <div>
                <div 
                    style={{width: '100%', height: '200px'}}
                    //style={{width: '100%', height: '400px'}}
                    
                >
                    <StickyTable
                        stickyHeaderCount={1}
                        stickyColumnCount={1}
                    >
                        <Row>
                            <Cell style={{ backgroundColor: "#ccddcc", borderColor: "#ee0000" }}>Header 1</Cell>
                            <Cell style={{ backgroundColor: "#ccddcc", borderColor: "#ee0000" }}>Header 2</Cell>
                            <Cell style={{ backgroundColor: "#ccddcc", borderColor: "#ee0000" }}>Header 3</Cell>
                            <Cell style={{ backgroundColor: "#ccddcc", borderColor: "#ee0000" }}>Header 4</Cell>
                            <Cell style={{ backgroundColor: "#ccddcc", borderColor: "#ee0000" }}>Header 5</Cell>
                            <Cell style={{ backgroundColor: "#ccddcc", borderColor: "#ee0000" }}>Header 6</Cell>
                            <Cell style={{ backgroundColor: "#ccddcc", borderColor: "#ee0000" }}>Header 7</Cell>
                            <Cell>Header 8</Cell>
                            <Cell>Header 9</Cell>
                            <Cell>Header 10</Cell>
                            <Cell>Header 11</Cell>
                            <Cell>Header 12</Cell>
                            <Cell>Header 13</Cell>
                            <Cell>Header 14</Cell>
                            <Cell>Header 15</Cell>
                        </Row>
                        <Row>
                            <Cell>cell long content 1</Cell>
                            <Cell>cell long content 1 2</Cell>
                            <Cell>cell long content 1 3</Cell>
                            <Cell>cell long content 1 4</Cell>
                            <Cell>cell long content 1 5</Cell>
                            <Cell>cell long content 1 6</Cell>
                            <Cell>cell long content 1 7</Cell>
                            <Cell>cell long content 1 8</Cell>
                            <Cell>cell long content 1 9</Cell>
                            <Cell>cell long content 1 10</Cell>
                            <Cell>cell long content 1 11</Cell>
                            <Cell>cell long content 1 12</Cell>
                            <Cell>cell long content 1 13</Cell>
                            <Cell>cell long content 1 14</Cell>
                            <Cell>cell long content 1 15</Cell>
                        </Row>

                        <Row>
                            <Cell style={{ backgroundColor: "#ccccdd", borderColor: "#ee0000" }}>cell long long content 1</Cell>
                            <Cell>cell long long content 1 2</Cell>
                            <Cell>cell long long content 1 3</Cell>
                            <Cell>cell long long content 1 4</Cell>
                            <Cell>cell long long content 1 5</Cell>
                            <Cell>cell long long content 1 6</Cell>
                            <Cell>cell long long content 1 7</Cell>
                            <Cell>cell long long content 1 8</Cell>
                            <Cell>cell long long content 1 9</Cell>
                            <Cell>cell long long content 1 10</Cell>
                            <Cell>cell long long content 1 11</Cell>
                            <Cell>cell long long content 1 12</Cell>
                            <Cell>cell long long content 1 13</Cell>
                            <Cell>cell long long content 1 14</Cell>
                            <Cell>cell long long content 1 15</Cell>
                        </Row>

                        <Row>
                            <Cell>cell  content 1</Cell>
                            <Cell>cell   content 1 2</Cell>
                            <Cell>cell   content 1 3</Cell>
                            <Cell>cell   content 1 4</Cell>
                            <Cell>cell   content 1 5</Cell>
                            <Cell>cell   content 1 6</Cell>
                            <Cell>cell   content 1 7</Cell>
                            <Cell>cell   content 1 8</Cell>
                            <Cell>cell   content 1 9</Cell>
                            <Cell>cell   content 1 10</Cell>
                            <Cell>cell   content 1 11</Cell>
                            <Cell>cell   content 1 12</Cell>
                            <Cell>cell   content 1 13</Cell>
                            <Cell>cell   content 1 14</Cell>
                            <Cell>cell   content 1 15</Cell>
                        </Row>
                    
                        <Row>
                            <Cell>cell long long content 1</Cell>
                            <Cell>cell long long content 1 2</Cell>
                            <Cell>cell long long content 1 3</Cell>
                            <Cell>cell long long content 1 4</Cell>
                            <Cell>cell long long content 1 5</Cell>
                            <Cell>cell long long content 1 6</Cell>
                            <Cell>cell long long content 1 7</Cell>
                            <Cell>cell long long content 1 8</Cell>
                            <Cell>cell long long content 1 9</Cell>
                            <Cell>cell long long content 1 10</Cell>
                            <Cell>cell long long content 1 11</Cell>
                            <Cell>cell long long content 1 12</Cell>
                            <Cell>cell long long content 1 13</Cell>
                            <Cell>cell long long content 1 14</Cell>
                            <Cell>cell long long content 1 15</Cell>
                        </Row>
                        <Row>
                            <Cell>cell long long content 1</Cell>
                            <Cell>cell long long content 1 2</Cell>
                            <Cell>cell long long content 1 3</Cell>
                            <Cell>cell long long content 1 4</Cell>
                            <Cell>cell long long content 1 5</Cell>
                            <Cell>cell long long content 1 6</Cell>
                            <Cell>cell long long content 1 7</Cell>
                            <Cell>cell long long content 1 8</Cell>
                            <Cell>cell long long content 1 9</Cell>
                            <Cell>cell long long content 1 10</Cell>
                            <Cell>cell long long content 1 11</Cell>
                            <Cell>cell long long content 1 12</Cell>
                            <Cell>cell long long content 1 13</Cell>
                            <Cell>cell long long content 1 14</Cell>
                            <Cell>cell long long content 1 15</Cell>
                        </Row>
                        <Row>
                            <Cell>cell long long content 1</Cell>
                            <Cell>cell long long content 1 2</Cell>
                            <Cell>cell long long content 1 3</Cell>
                            <Cell>cell long long content 1 4</Cell>
                            <Cell>cell long long content 1 5</Cell>
                            <Cell>cell long long content 1 6</Cell>
                            <Cell>cell long long content 1 7</Cell>
                            <Cell>cell long long content 1 8</Cell>
                            <Cell>cell long long content 1 9</Cell>
                            <Cell>cell long long content 1 10</Cell>
                            <Cell>cell long long content 1 11</Cell>
                            <Cell>cell long long content 1 12</Cell>
                            <Cell>cell long long content 1 13</Cell>
                            <Cell>cell long long content 1 14</Cell>
                            <Cell>cell long long content 1 15</Cell>
                        </Row>
                        <Row>
                            <Cell>cell long long content 1</Cell>
                            <Cell>cell long long content 1 2</Cell>
                            <Cell>cell long long content 1 3</Cell>
                            <Cell>cell long long content 1 4</Cell>
                            <Cell>cell long long content 1 5</Cell>
                            <Cell>cell long long content 1 6</Cell>
                            <Cell>cell long long content 1 7</Cell>
                            <Cell>cell long long content 1 8</Cell>
                            <Cell>cell long long content 1 9</Cell>
                            <Cell>cell long long content 1 10</Cell>
                            <Cell>cell long long content 1 11</Cell>
                            <Cell>cell long long content 1 12</Cell>
                            <Cell>cell long long content 1 13</Cell>
                            <Cell>cell long long content 1 14</Cell>
                            <Cell>cell long long content 1 15</Cell>
                        </Row>
                        <Row>
                            <Cell>cell long long content 1</Cell>
                            <Cell>cell long long content 1 2</Cell>
                            <Cell>cell long long content 1 3</Cell>
                            <Cell>cell long long content 1 4</Cell>
                            <Cell>cell long long content 1 5</Cell>
                            <Cell>cell long long content 1 6</Cell>
                            <Cell>cell long long content 1 7</Cell>
                            <Cell>cell long long content 1 8</Cell>
                            <Cell>cell long long content 1 9</Cell>
                            <Cell>cell long long content 1 10</Cell>
                            <Cell>cell long long content 1 11</Cell>
                            <Cell>cell long long content 1 12</Cell>
                            <Cell>cell long long content 1 13</Cell>
                            <Cell>cell long long content 1 14</Cell>
                            <Cell>cell long long content 1 15</Cell>
                        </Row>

                    </StickyTable>
                </div>
            </div>    
        );
    }
}