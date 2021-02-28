function solvePuzzle(pieces) {
  const rowNumber = 10;
  const colNumber = 10;
  let actualPiece = pieces[0];

  function setFirstPiece(piece) {
    if (piece['edges']['left'] === null && piece['edges']['top'] === null)
      return;
    for (let i = 0; i < 3; i++) {
      let changedPiece = rotate(piece);
      if (
        changedPiece['edges']['left'] === null &&
        changedPiece['edges']['top'] === null
      ) {
        piece = changedPiece;
        return piece;
      }
    }
  }

  function rotate(piece) {
    let a = piece['edges']['top'];

    piece['edges']['top'] = piece['edges']['left'];
    piece['edges']['left'] = piece['edges']['bottom'];
    piece['edges']['bottom'] = piece['edges']['right'];
    piece['edges']['right'] = a;

    return piece;
  }

  function checkMatch(actualPiece, piece, actualEdge, edge) {
    edgeTypeId = actualPiece['edges'][actualEdge]['edgeTypeId'];

    if (
      piece['edges'][edge] != null &&
      piece['edges'][edge]['edgeTypeId'] === edgeTypeId
    ) {
      return true;
    } else return false;
  }

  function smartCheckMatch(actualPiece, piece, actualEdge, edge) {
    if (piece.id === actualPiece.id) {
      return null;
    }
    if (checkMatch(actualPiece, piece, actualEdge, edge)) return piece;

    for (let i = 0; i < 4; i++) {
      piece = rotate(piece);
      if (checkMatch(actualPiece, piece, actualEdge, edge)) return piece;
    }
    return null;
  }

  function findFirstRow(actualPiece, actualEdge, edge) {
    setFirstPiece(pieces[0]);
    let firstRow = [];
    firstRow.push(pieces[0].id);

    while (firstRow.length < colNumber) {
      for (let i = 0; i < pieces.length; i++) {
        let changedPiece = smartCheckMatch(
          actualPiece,
          pieces[i],
          actualEdge,
          edge
        );
        if (changedPiece != null && firstRow.length < colNumber) {
          pieces[i] = changedPiece;
          actualPiece = pieces[i];
          firstRow.push(changedPiece.id);
        }
        if (firstRow.length === colNumber) {
          break;
        }
      }
    }
    return firstRow;
  }

  function findPieces(row, pieces) {
    let foundPieces = [];
    for (let i = 0; i < row.length; i++) {
      let p = pieces.find((piece) => piece.id === row[i]);
      foundPieces.push(p);
    }
    return foundPieces;
  }

  function findRow(row, actualEdge, edge) {
    let newRow = [];
    let actualPieces = findPieces(row, pieces);
    for (let n = 0; n < actualPieces.length; n++) {
      let actualPiece = actualPieces[n];
      for (let i = 0; i < pieces.length; i++) {
        let changedPiece = smartCheckMatch(
          actualPiece,
          pieces[i],
          actualEdge,
          edge
        );
        if (changedPiece != null) {
          pieces[i] = changedPiece;

          newRow.push(changedPiece.id);
        }
        if (newRow.length === colNumber) {
          break;
        }
      }
    }
    return newRow;
  }

  function solveAllPuzzle(actualEdge, edge) {
    let row = findFirstRow(actualPiece, actualEdge, edge);
    let result = [];
    result = row;
    for (let i = 0; i < 9; i++) {
      let newRow = findRow(row, 'bottom', 'top');
      row = newRow;
      result = result.concat(row);
    }
    return result;
  }

  let puzzle = solveAllPuzzle('right', 'left');
  console.log(puzzle);
  return puzzle;
}

// Не удаляйте эту строку

window.solvePuzzle = solvePuzzle;
solvePuzzle(pieces);
