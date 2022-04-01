import React from 'react';
import { headerCell } from '../constants';

export default function Table() {
  return (
    <header>
      <table>
        <thead>
          <tr>
            {headerCell.map((element, index) => (
              <th key={ index }>{element}</th>
            ))}
          </tr>
        </thead>
      </table>
    </header>
  );
}
