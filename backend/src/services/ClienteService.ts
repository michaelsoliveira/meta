import { PrismaClient, TipoPessoa } from "@prisma/client";
const prismaClient = new PrismaClient();

type ClienteType = {
    tipo: string;
    juridica: {
        razao_social: string;
        nome_fantasia: string;
        cnpj: string;
        data_constituicao: Date;
    }
    fisica: {
        nome: string;
        rg: string;
        data_nascimento: Date;
    },
    endereco: {
        logradouro: string;
        bairro: string;
    }
}

class ClienteService {
  async findAll() {
    
    const [data, total] = await prismaClient.$transaction([
        prismaClient.cliente.findMany({
          include: {
              pessoa: {
                  include: {
                      endereco: true,
                      fisica: true,
                      juridica: true,
                      user: true,
                  },
              }
          }
      }),
      prismaClient.cliente.count()
    ]);

    return {
      data,
      total
    }
  }

  async findById(id: string) {
    return await prismaClient.cliente.findUnique({
      where: { id },
        include: {
            pessoa: {
                include: {
                    endereco: true,
                    fisica: true,
                    juridica: true,
                    user: true,
                },
            }
        }
    });
  }

  async create(data: ClienteType) {
    return await prismaClient.cliente.create({
      data: {
        pessoa: {
            create: {
                tipo: data.tipo as TipoPessoa,
                endereco: data.endereco
                ? {
                    create: data.endereco,
                    }
                : undefined,
                fisica:
                data.tipo === "F" && data.fisica
                    ? {
                        create: {
                            ...data.fisica,
                            data_nascimento: new Date(data.fisica.data_nascimento)
                        },
                    }
                    : undefined,
                juridica:
                data.tipo === "J" && data.juridica
                    ? {
                        create: data.juridica,
                    }
                    : undefined,
            }
        }
      },
      include: {
        pessoa: {
            include: {
                endereco: true,
                fisica: true,
                juridica: true,
            },
        }
      }
    });
  }

  async update(id: string, data: any) {
    const {
      endereco,
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
                fisica: data?.tipo === "F"
                ? {
                    update: {
                      nome: data?.nome,
                      cpf: data?.cpf,
                      rg: data?.rg
                    },
                  }
                : undefined,
                juridica: data?.tipo === "J"
                ? {
                    update: {
                      cnpj: data?.cnpj,
                      nome_fantasia: data?.nomeFantasia,
                      razao_social: data?.razaoSocial
                    },
                  }
                : undefined,
            }
        }
      },
      include: {
        pessoa: {
            include: {
                endereco: true,
                fisica: true,
                juridica: true,
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
