interface ASTNode {
  statement: string;

  parse();

  evaluate();
}