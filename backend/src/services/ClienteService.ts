import { PrismaClient, TipoPessoa } from "@prisma/client";
const prismaClient = new PrismaClient();

type ClienteType = {
    pessoa: {
        tipo: string;
        pessoa_juridica: {
            razao_social: string;
            nome_fantasia: string;
            cnpj: string;
            data_constituicao: Date;
        }
        pessoa_fisica: {
            nome: string;
            rg: string;
            data_nascimento: Date;
        },
        endereco: {
            logradouro: string;
            bairro: string;
        }
    }
}

class ClienteService {
  async findAll() {
    return await prismaClient.cliente.findMany({
        include: {
            pessoa: {
                include: {
                    endereco: true,
                    pessoa_fisica: true,
                    pessoa_juridica: true,
                    user: true,
                },
            }
        }
    });
  }

  async findById(id: string) {
    return await prismaClient.cliente.findUnique({
      where: { id },
        include: {
            pessoa: {
                include: {
                    endereco: true,
                    pessoa_fisica: true,
                    pessoa_juridica: true,
                    user: true,
                },
            }
        }
    });
  }

  async create(data: ClienteType) {
    const { pessoa } = data
    return await prismaClient.cliente.create({
      data: {
        pessoa: {
            create: {
                tipo: pessoa.tipo as TipoPessoa,
                endereco: pessoa.endereco
                ? {
                    create: pessoa.endereco,
                    }
                : undefined,
                pessoa_fisica:
                pessoa.tipo === "F" && pessoa.pessoa_fisica
                    ? {
                        create: {
                            ...pessoa.pessoa_fisica,
                            data_nascimento: new Date(pessoa.pessoa_fisica.data_nascimento)
                        },
                    }
                    : undefined,
                pessoa_juridica:
                pessoa.tipo === "J" && pessoa.pessoa_juridica
                    ? {
                        create: pessoa.pessoa_juridica,
                    }
                    : undefined,
            }
        }
      },
      include: {
        pessoa: {
            include: {
                endereco: true,
                pessoa_fisica: true,
                pessoa_juridica: true,
            },
        }
      }
    });
  }

  async update(id: string, data: any) {
    const {
      endereco,
      pessoa_fisica,
      pessoa_juridica,
      ...pessoaData
    } = data;

    return await prismaClient.cliente.update({
      where: { id },
      data: {
        pessoa: {
            update: {
                ...pessoaData,
                endereco: endereco
                ? {
                    update: endereco,
                    }
                : undefined,
                pessoa_fisica: pessoa_fisica
                ? {
                    update: pessoa_fisica,
                    }
                : undefined,
                pessoa_juridica: pessoa_juridica
                ? {
                    update: pessoa_juridica,
                    }
                : undefined,
            }
        }
      },
      include: {
        pessoa: {
            include: {
                endereco: true,
                pessoa_fisica: true,
                pessoa_juridica: true,
            }
        }
      },
    });
  }

  async delete(id: string) {
    try {
      return await prismaClient.cliente.delete({
        where: { id },
      }).then(() => ({
        error: false,
        message: "Cliente deletado com sucesso!",
      }));
    } catch (e: any) {
      return {
        error: true,
        message: e.message,
      };
    }
  }
}

export default new ClienteService();
